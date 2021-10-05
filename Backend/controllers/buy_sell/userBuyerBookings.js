const getDB = require("../../db");

const userBuyerBookings = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [result] = await connection.query(
      `
      SELECT *
      FROM sales s
      LEFT JOIN products p ON s.product_id = p.id
      LEFT JOIN products_photos pp ON s.product_id = pp.product_id
      WHERE s.userBuyer_id=? `,
      [req.userAuth.id]
    );

    if (result === 0) {
      const error = new Error("No has reservado ningún producto.");
      error.httpStatus = 403;
      throw error;
    }

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userBuyerBookings;
