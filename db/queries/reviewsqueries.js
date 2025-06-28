import db from "../client.js";

export async function getReviews(){
    const sql = `
        SELECT *
        FROM reviews;
    `;

    const {rows: reviews} = await db.query(sql);
    return reviews;
}

export async function getReviewsById(id){
    const sql = `
        SELECT *
        FROM reviews
        WHERE id = $1;
    `;

    const {rows: review} = await db.query(sql, [id]);
    return review[0];
}

export async function updateReview({id, rating, comment, product_id}){
    const sql = `
        UPDATE reviews
        SET rating = $1, comment = $2, product_id = $3
        WHERE id = $4
        RETURNING *;
    `;

    const {rows: review} =  await db.query(sql, [rating, comment, product_id, id]);
    return review[0];
}

export async function deleteReview(id){
    const sql = `
        DELETE FROM reviews
        WHERE id = $1
        RETURNING *;
    `;

    const {rows: review} = await db.query(sql, [id]);
    return review;
}