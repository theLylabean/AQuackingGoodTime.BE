import db from "./client.js";

const finalSeed = async () => {
    await db.connect();
    await allTables();
}

async function allTables() {
    const sql = `
    DELETE FROM products;
    DELETE FROM users;
    DELETE FROM orders;
    DELETE FROM reviews;

    INSERT INTO products (title, image_url, price, description) VALUES
        (
            '80''s Cube Duck (Rubick's)', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            18.99, 
            'Love the Rubick''s Cube? Well, this is the Rubber Duck for you!'
        ),
        (
            'Aerosmith Seven Tyler Squawk This Way Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            19.99, 
            'Classic Rock & Roll lovers will Walk This Way for this Rubber Duck!'
        ),
        (
            'Albert Einstein Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'Hurry! This Rubber Duck will be gone faster than the schpeed of light!'
        ),
        (
            'Alligator Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            10.99, 
            'Rawr! Don''t let this Alligator see you later!'
        ),
        (
            'Avatar Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'Travel Pandora and help save the Na''vi people from humanity!'
        ),
        (
            'Balloon Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'Balloon and Ducks come together to deliver this adorbal Rubber Ducky!'
        ),
        (
            'Band Cymbal Player Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            10.99, 
            'Band Nerds unite! March in step to get your hands on this Rubber Duck!'
        ),
        (
            'Bat Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'Grab yourself a sky puppy before they fly away!'
        ),
        (
            'Black Power Ranger Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            27.99, 
            'It''s Morphin time! Don''t wait too long to fight along side Zack Taylor against the evil Rita!'
        ),
        (
            'Blue Dragon Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            10.99, 
            'Train your own Dragon! This Blue Dragon Rubber Duck will be a greate companion!'
        ),
        (
            'Bob Official Minions Tubbz Boxed Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            25.99, 
            'Stay young at heart with this Official Bob Minions Rubber Duck!'
        ),
        (
            'Bride Wedding Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            25.99, 
            'Here comes the Bride! What a cute way to celebrate your love on your special day!'
        ),
        (
            'Captain Quack Mallard, Pirate of the Quackibbean Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            19.99, 
            'Sail the seas with Captain Quack Mallard! This will be the day you will always remember as the day you almost bought Captain Quack Mallard!'
        ),
        (
            'Christmas Tree Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'O Christmas tree, O Christmas tree, how lovely are your duckies!'
        ),
        (
            'Glow in the Dark Cat Gift Bundle - Small Rubber Ducks', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            11.99, 
            'Grab these in time for Spooky Season! Share them with friends or keep them all for yourself!'
        ),
        (
            'Groom Wedding Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            25.99, 
            'Complete your day with this Groom Rubber Duck! What a cute way to celebrate your love on your special day!'
        ),
        (
            'Lord of the Rings Samwise Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            26.99, 
            'Grab your Po-Tay-Toes and hurry to go on an adventure with your most loyal friend!'
        ),
        (
            'Lucky Cat Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            14.99, 
            'Make sure you grab this Lucky Cat up real quick! Your forune will surely turn around!'
        ),
        (
            'Pinball Gizzard (The Who, Roger Daltrey) Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            19.99, 
            'Don't let that deaf, dumb, and blind kid beat you to this Rubber Ducky too!'
        ),
        (
            'Pink Power Ranger Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            27.99, 
            'It''s Morphin time! Don''t wait too long to fight along side Kimberly Ann Hart against the evil Rita!'
        ),
        (
            'Sonic the Hedgehog Knuckles Rubber Duck - Tubbz Limmited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            21.99, 
            'Race to get the Chaos Emeralds before Dr. Robotnik Does!'
        ),
        (
            'The Finger Rubber Duck', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            12.99, 
            'This Rubber Duck is as offensive as it is cute!'
        ),(
            'Yellow Power Ranger Rubber Duck - Tubbz Limited Edition', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            27.99, 
            'It''s Morphin time! Don''t wait too long to fight along side Trini Kwan against the evil Rita!'
        )

    INSERT INTO users (first_name, last_name, username, password) VALUES
        (
            'Lyla', 
            'Lynn',
            'thelylabean', 
            '421aters'
        ),
        (
            'Justin', 
            'Lynn',
            'drjustus, 
            'wolfie13'
        ),
        (
            'Larry', 
            'Maxwell',
            'coinman9, 
            'max1218'
        ),
        (
            'Tyler', 
            'Maxwell',
            'tdmax427, 
            '421aters'
        )
    
    INSERT INTO orders (date, note, userId) VALUES
        (
            '2024-06-01', 
            'Leave on the front porch please.',
            (SELECT id FROM users ORDER BY id LIMIT 1)
        ),
        (
            '2024-06-05',
            'Need delivery before Friday.',
            (SELECT id FROM users ORDER BY id LIMIT 4)
        ),
        (
            '2024-06-10',
            NULL,
            (SELECT id FROM users ORDER BY id LIMIT 1)
        )

    INSERT INTO reviews (rating, comment, product_id, user_id) VALUES
        (
            10,
            'Aerosmith is my favorite band of all time! I love talking to Steve Tyler whenever I want and he just listens. He's a chill dude. 10/10 would buy again!',
            2,
            3
        ),
        (
            8,
            'Band nerd here. Love that your website includes so many different ducks! I especially love the cymbal player cause that''s what I played in high school!',
            7,
            3
        ),
        (
            9,
            'This is a brilliant play on words and I love The Who. Best duck I''ve ever bought.',
            19,
            3
        )
    `;
    await db.query(sql);
}
finalSeed();
console.log("🌱 Database seeded.");
await db.end();
