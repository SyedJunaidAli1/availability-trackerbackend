import { pool } from "../config/db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, tags, description
       FROM users WHERE role = 'user'`,
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all mentors
export const getMentors = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, tags, description
       FROM users WHERE role = 'mentor'`,
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRes = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );

    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const mentorRes = await pool.query(
      `SELECT id, name, email, tags, description 
       FROM users WHERE role = 'mentor'`
    );

    const mentors = mentorRes.rows;

    const userDesc = user.description?.toLowerCase() || "";

    const scoredMentors = mentors.map((mentor) => {
      let score = 0;

      // Tag match
      const commonTags =
        mentor.tags?.filter((tag) => user.tags?.includes(tag)) || [];

      score += commonTags.length * 3;

      // Description match
      if (
        mentor.description &&
        user.description &&
        mentor.description.toLowerCase().includes(userDesc)
      ) {
        score += 1;
      }

      // Smart matching
      if (userDesc.includes("interview")) {
        if (mentor.tags?.includes("mock-interview")) {
          score += 3;
        }
      }

      if (userDesc.includes("resume")) {
        if (mentor.tags?.includes("big-company")) {
          score += 3;
        }
      }

      if (userDesc.includes("guidance")) {
        if (mentor.tags?.includes("communication")) {
          score += 2;
        }
      }

      return {
        mentor,
        score,
      };
    });

    scoredMentors.sort((a, b) => b.score - a.score);

    res.json(scoredMentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const bookCall = async (req, res) => {
  const { userId, mentorId, call_type } = req.body;

  try {
    // Get user availability
    const userAvail = await pool.query(
      `SELECT * FROM availability WHERE user_id = $1`,
      [userId]
    );

    // Get mentor availability
    const mentorAvail = await pool.query(
      `SELECT * FROM availability WHERE user_id = $1`,
      [mentorId]
    );

    let matchedSlot = null;

    // Find overlap
    for (let u of userAvail.rows) {
      for (let m of mentorAvail.rows) {
        if (u.date.toISOString() === m.date.toISOString()) {
          if (
            u.start_time < m.end_time &&
            m.start_time < u.end_time
          ) {
            matchedSlot = {
              date: u.date,
              start: u.start_time > m.start_time ? u.start_time : m.start_time,
              end: u.end_time < m.end_time ? u.end_time : m.end_time,
            };
            break;
          }
        }
      }
      if (matchedSlot) break;
    }

    if (!matchedSlot) {
      return res.status(400).json({
        message: "No overlapping availability found",
      });
    }

    // Create call
    const result = await pool.query(
      `INSERT INTO calls (user_id, mentor_id, call_type, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        mentorId,
        call_type,
        `${matchedSlot.date.toISOString().split("T")[0]} ${matchedSlot.start}`,
        `${matchedSlot.date.toISOString().split("T")[0]} ${matchedSlot.end}`,
      ]
    );

    res.json({
      message: "Call booked successfully",
      call: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};