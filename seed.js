// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

const User = require("./schemes/user_scheme");
const Shelter = require("./schemes/shelter_scheme");

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

dotenv.config(); // Load environment variables

const users = [
    {
        //username: "john_doe",
        email: "john@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        israeli_ID: 111111111,
        address: "ahi eilat street, haifa",
        saved_shelters: [],
    },
    {
        //username: "jane_doe",
        email: "jane@example.com",
        password: "password456",
        firstName: "Jane",
        lastName: "Doe",
        israeli_ID: 222222222,
        address: "harishonim street, haifa",
        saved_shelters: [],
    },
];

const shelters = [
    {
        "address": "Pestalozzi 12",
        "capacity": 90,
        "coordinates": {
            "latitude": 32.0856,
            "longitude": 34.7866
        },
        "notes": "The shelter is located in the yard behind house number 12. Approach from Pestalozzi Street, turn right at house 12 onto path 3883 (Anna Venetsianov), and the shelter is located in the yard between the buildings.",
        "accessibility": true
    },
    {
        "address": "Pestalozzi 31",
        "capacity": 90,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located within the grounds of 'Lev Jaffa Al Zahraa' school. At the end of Pestalozzi Street, near house number 29, there is the school gate. Turn left towards the open basketball court; the shelter is at the end of it.",
        "accessibility": true
    },
    {
        "address": "Ehrlich 35",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0850,
            "longitude": 34.7864
        },
        "notes": "The shelter is within a closed area that once belonged to the Weizmann school. The main entrance is from Ehrlich Street 37, opposite the entrance to the parking lot of the Tzahala Geriatric Center. There is an iron gate that opens in an emergency, and the shelter is right behind it.",
        "accessibility": true
    },
    {
        "address": "Gaza 8",
        "capacity": 440,
        "coordinates": {
            "latitude": 32.0857,
            "longitude": 34.7814
        },
        "notes": "The shelter is in the shared building at number 8. Enter through the main entrance, and immediately to the right, before the stairs, is the entrance to the underground shelter.",
        "accessibility": true
    },
    {
        "address": "Ehrlich 3",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0853,
            "longitude": 34.7861
        },
        "notes": "The shelter is located across from 'Gan HaShnaim.' On Ehrlich Street, opposite house number 2, there is parking next to Gan HaShnaim. The shelter is at the end of the parking lot.",
        "accessibility": true
    },
    {
        "address": "Tzahala HaRofeh 3",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0860,
            "longitude": 34.7863
        },
        "notes": "The shelter is located across from house number 6, near the Fuad Ismail Dajani Square.",
        "accessibility": true
    },
    {
        "address": "Yefet 44",
        "capacity": 50,
        "coordinates": {
            "latitude": 32.0863,
            "longitude": 34.7821
        },
        "notes": "The shelter is within the grounds of the 'Mozot' school. The entrance is from the main gate, opposite 'Terra Santa' school at Yefet 49. Enter through the gate and go straight to the shelter building.",
        "accessibility": true
    },
    {
        "address": "HaTikva 46",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0859,
            "longitude": 34.7823
        },
        "notes": "The shelter is located across from house number 46 in the square opposite the Mandel Cultural Center. It can also be reached from HaTachia Street 1 and from the Bloomfield Stadium area.",
        "accessibility": true
    },
    {
        "address": "Yossi Ben Yossi 1",
        "capacity": 600,
        "coordinates": {
            "latitude": 32.0870,
            "longitude": 34.7875
        },
        "notes": "At the corner of Noam Street 4, the shelter entrance is at the end of the dead-end street, to the right of the parking lot of the Open Democratic School, and next to the public garden. It can also be accessed from Ole Ziyon Street 24, Yehuda Marguza Street 11.",
        "accessibility": true
    },
    {
        "address": "Tribes of Israel 77",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0875,
            "longitude": 34.7827
        },
        "notes": "The shelter is within the grounds of the 'Kulana Yachad' school. Enter through the main gate, go straight, down the stairs, and the shelter is on the right.",
        "accessibility": true
    },
    {
        "address": "Tzahalit 40",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0856,
            "longitude": 34.7798
        },
        "notes": "The shelter is located opposite 'Rappaport Garden,' at the corner of Bat Ayin Street 5.",
        "accessibility": true
    },
    {
        "address": "Chabad Boulevard 26",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0851,
            "longitude": 34.7825
        },
        "notes": "At the corner of Rebbe of Peshischa 4. The shelter is located opposite Bat Ayin Street 18, in the square.",
        "accessibility": true
    },
    {
        "address": "Lotus 12",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0855,
            "longitude": 34.7835
        },
        "notes": "The shelter is located opposite house number 12 in the public square. It can also be accessed via Yefet Street 120.",
        "accessibility": true
    },
    {
        "address": "Mazel Gadi Alley 3",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0858,
            "longitude": 34.7824
        },
        "notes": "The shelter is located at the corner of Mazel Gadi Alley 3 and Mazel Dagim Alley, inside a parking lot with an electric gate. Near the shelter is the Ramses Gate Garden, which is part of the Pisgah Garden, the Goldsmiths Parking Lot, and the Simta Theater. It can also be accessed from Yefet Street 32, through Pnina Street, and up through the Goldsmiths Street.",
        "accessibility": true
    },
    {
        "address": "HaSefina 18",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0870,
            "longitude": 34.7851
        },
        "notes": "The shelter is within the grounds of the 'Hassan Arafa' school. The entrance is from HaSefina Street, opposite house number 18. The approach is from Kedem Street 40 to HaSefina Street.",
        "accessibility": true
    },
    {
        "address": "Ashdod 7",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0857,
            "longitude": 34.7808
        },
        "notes": "The shelter is located opposite house number 14, next to the grove and the public garden.",
        "accessibility": true
    },
    {
        "address": "Israel Merizin 9",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0859,
            "longitude": 34.7822
        },
        "notes": "The shelter is located at the corner of Israel Merizin Street and Rothschild Avenue. It can also be accessed from the nearby parking lot.",
        "accessibility": true
    },
    {
        "address": "4 Yekutiel Adam St, Tel Aviv-Yafo, Israel",
        "capacity": 50,
        "coordinates": {
            "latitude": 32.084,
            "longitude": 34.788
        },
        "notes": "Located in a central area.",
        "accessibility": true
    },
    {
        "address": "8 HaOgen St, Tel Aviv-Yafo, Israel",
        "capacity": 40,
        "coordinates": {
            "latitude": 32.086,
            "longitude": 34.790
        },
        "notes": "Near the central bus station.",
        "accessibility": true
    },
    {
        "address": "23 HaRakevet St, Haifa, Israel",
        "capacity": 30,
        "coordinates": {
            "latitude": 32.821,
            "longitude": 34.986
        },
        "notes": "Close to the train station.",
        "accessibility": false
    },
    {
        "address": "12 Shimon Ben Shetach St, Jerusalem, Israel",
        "capacity": 20,
        "coordinates": {
            "latitude": 31.769,
            "longitude": 35.216
        },
        "notes": "In the heart of the old city.",
        "accessibility": true
    },
    {
        "address": "6 Rothschild Blvd, Tel Aviv-Yafo, Israel",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.075,
            "longitude": 34.781
        },
        "notes": "Popular area with high foot traffic.",
        "accessibility": true
    },
    {
        "address": "14 Ben Gurion Blvd, Tel Aviv-Yafo, Israel",
        "capacity": 35,
        "coordinates": {
            "latitude": 32.080,
            "longitude": 34.780
        },
        "notes": "Close to several major landmarks.",
        "accessibility": true
    },
    {
        "address": "10 Ha'aliya St, Tel Aviv-Yafo, Israel",
        "capacity": 45,
        "coordinates": {
            "latitude": 32.084,
            "longitude": 34.787
        },
        "notes": "Residential area with good amenities.",
        "accessibility": true
    },
    {
        "address": "7 Ben Yehuda St, Tel Aviv-Yafo, Israel",
        "capacity": 25,
        "coordinates": {
            "latitude": 32.073,
            "longitude": 34.782
        },
        "notes": "Close to the beach.",
        "accessibility": true
    },
    {
        "address": "9 HaNevi'im St, Jerusalem, Israel",
        "capacity": 40,
        "coordinates": {
            "latitude": 31.768,
            "longitude": 35.213
        },
        "notes": "Near several religious sites.",
        "accessibility": true
    },
    {
        "address": "22 Rothschild Blvd, Tel Aviv-Yafo, Israel",
        "capacity": 55,
        "coordinates": {
            "latitude": 32.076,
            "longitude": 34.782
        },
        "notes": "Busy commercial area.",
        "accessibility": true
    },
    {
        "address": "5 Herzl St, Tel Aviv-Yafo, Israel",
        "capacity": 50,
        "coordinates": {
            "latitude": 32.080,
            "longitude": 34.785
        },
        "notes": "Located near major shopping areas.",
        "accessibility": true
    },
    {
        "address": "3 Shalom Aleichem St, Haifa, Israel",
        "capacity": 30,
        "coordinates": {
            "latitude": 32.818,
            "longitude": 34.987
        },
        "notes": "In a quieter neighborhood.",
        "accessibility": false
    },
    {
        "address": "8 Chaim Weizmann St, Tel Aviv-Yafo, Israel",
        "capacity": 65,
        "coordinates": {
            "latitude": 32.083,
            "longitude": 34.786
        },
        "notes": "Close to major office buildings.",
        "accessibility": true
    },
    {
        "address": "11 HaRav Herzog St, Jerusalem, Israel",
        "capacity": 25,
        "coordinates": {
            "latitude": 31.767,
            "longitude": 35.217
        },
        "notes": "Near several educational institutions.",
        "accessibility": true
    },
    {
        "address": "13 HaPalyam St, Haifa, Israel",
        "capacity": 20,
        "coordinates": {
            "latitude": 32.820,
            "longitude": 34.987
        },
        "notes": "Close to the port area.",
        "accessibility": false
    },
    {
        "address": "2 Hahashmonaim St, Tel Aviv-Yafo, Israel",
        "capacity": 70,
        "coordinates": {
            "latitude": 32.075,
            "longitude": 34.785
        },
        "notes": "In a high-traffic area.",
        "accessibility": true
    },
    {
        "address": "15 HaRav Kook St, Jerusalem, Israel",
        "capacity": 50,
        "coordinates": {
            "latitude": 31.769,
            "longitude": 35.212
        },
        "notes": "Near historical sites.",
        "accessibility": true
    },
    {
        "address": "6 HaRakevet St, Haifa, Israel",
        "capacity": 45,
        "coordinates": {
            "latitude": 32.820,
            "longitude": 34.986
        },
        "notes": "Close to the central train station.",
        "accessibility": false
    },
    {
        "address": "18 Hayarkon St, Tel Aviv-Yafo, Israel",
        "capacity": 40,
        "coordinates": {
            "latitude": 32.072,
            "longitude": 34.776
        },
        "notes": "Popular with tourists.",
        "accessibility": true
    },
    {
        "address": "12 Moshiko St, Tel Aviv-Yafo, Israel",
        "capacity": 35,
        "coordinates": {
            "latitude": 32.079,
            "longitude": 34.790
        },
        "notes": "Residential area with good amenities.",
        "accessibility": true
    },
    {
        "address": "Shderot Gori Israel 31",
        "capacity": 90,
        "coordinates": {
            "latitude": 31.978,
            "longitude": 34.772
        },
        "notes": "The shelter is located at the corner of Kesshet 4 and Gori Israel Street. It is located near the community center on the ground floor. You can enter via the main gate of the community center.",
        "accessibility": true
    },
    {
        "address": "Ohev Israel 12",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.979,
            "longitude": 34.780
        },
        "notes": "The shelter is located in the heart of 'Los Angeles' Garden between houses 12 and 14. Access is also available through Yitzhak Katz Street 17 and Shderot Chabad 46 through the garden. The shelter has a sliding door that opens manually in an emergency.",
        "accessibility": true
    },
    {
        "address": "Israel Marizin 9",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.973,
            "longitude": 34.786
        },
        "notes": "The shelter is located at the end of the street in the plaza between buildings 5, 6, and 9, opposite the parking lot. The shelter itself is in front of house number 9. Access is available from Dov Mamzerit Street 17 or 15, then turn right or left onto Marizin Street.",
        "accessibility": true
    },
    {
        "address": "Shderot Chabad 26",
        "capacity": 60,
        "coordinates": {
            "latitude": 31.977,
            "longitude": 34.775
        },
        "notes": "Corner of Rabbi Pshischa 4. The shelter is located opposite Bat Ein 18, in the plaza.",
        "accessibility": true
    },
    {
        "address": "Tziatli 40",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.976,
            "longitude": 34.774
        },
        "notes": "The shelter is located opposite 'Rappaport Garden' at the corner of Bat Ein 5.",
        "accessibility": true
    },
    {
        "address": "Lotus 12",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.972,
            "longitude": 34.772
        },
        "notes": "The shelter is located opposite house number 12 in the public plaza. Access is also available through Yefet Street 120.",
        "accessibility": true
    },
    {
        "address": "Shevet Yisrael 77",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.971,
            "longitude": 34.780
        },
        "notes": "The shelter is located within the 'Kolna Yachad' school grounds. Entry is from the main gate, go straight, descend the stairs, and the shelter is to the right.",
        "accessibility": true
    },
    {
        "address": "Toulouse 8",
        "capacity": 3900,
        "coordinates": {
            "latitude": 31.970,
            "longitude": 34.778
        },
        "notes": "Access through the guard.",
        "accessibility": true
    },
    {
        "address": "Pikus 19",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.968,
            "longitude": 34.779
        },
        "notes": "The shelter is located within 'Hashmonaim' school grounds. Currently (as of 16.6.22), the school is under renovation, so access is not from the main gate, but instead from the parallel street in front of Neve Golan's football field. Access is possible from the path between the school and house number 21 or from Yefet 169.",
        "accessibility": true
    },
    {
        "address": "Mendes France 8",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.970,
            "longitude": 34.773
        },
        "notes": "The shelter is located in Toulouse Garden, opposite house number 5, near the Sports Center and the Arab-Jewish Center in Jaffa.",
        "accessibility": true
    },
    {
        "address": "Tze'elon HaRofeh 3",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.969,
            "longitude": 34.772
        },
        "notes": "The shelter is located opposite house number 6, near Foad Ismail Dajani Square.",
        "accessibility": true
    },
    {
        "address": "Kedem 125",
        "capacity": 60,
        "coordinates": {
            "latitude": 31.968,
            "longitude": 34.774
        },
        "notes": "The shelter is located opposite house number 125 with access through the adjacent parking lot. Additionally, the shelter is opposite the Kalla HaYam Restaurant on Two Sisters Street 2, which leads to the Givat Aliyah beach. There is no access from Two Sisters Street, so you must ascend to Kedem through the parking lot.",
        "accessibility": true
    },
    {
        "address": "Ashdod 7",
        "capacity": 60,
        "coordinates": {
            "latitude": 31.970,
            "longitude": 34.771
        },
        "notes": "The shelter is located opposite house number 14, adjacent to a grove and public garden.",
        "accessibility": true
    },
    {
        "address": "Pachad Yitzhak 8",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.968,
            "longitude": 34.777
        },
        "notes": "The shelter is located within 'Shila' school grounds. Entry is from the main gate, go straight, cross the basketball court, and the shelter is located inside the fenced area directly ahead.",
        "accessibility": true
    },
    {
        "address": "Nahal Sorek 5",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.967,
            "longitude": 34.779
        },
        "notes": "The shelter is located within the grounds of two schools - 'Chabad Girls' and 'Yafe Nof'. Each school has its own entry to the shelter. Access is from the main gate towards the shelter.",
        "accessibility": true
    },
    {
        "address": "Arlich 3",
        "capacity": 60,
        "coordinates": {
            "latitude": 31.970,
            "longitude": 34.782
        },
        "notes": "The shelter is located opposite 'Gan HaShnayim'. On Arlich Street, opposite house number 2, there is parking adjacent to Gan HaShnayim. The shelter is at the end of the parking area.",
        "accessibility": true
    },
    {
        "address": "Arlich 35",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.969,
            "longitude": 34.780
        },
        "notes": "The shelter is located within a closed area that previously belonged to Weizmann School. The main entry is from Arlich 37, opposite the entrance to the parking lot of the Geriatric Center. There is a metal gate that opens in an emergency, and the shelter is immediately after it. Nearby is the Lewis and Gabi Weissfeld Young Division building.",
        "accessibility": true
    },
    {
        "address": "Pastelucy 12",
        "capacity": 90,
        "coordinates": {
            "latitude": 31.970,
            "longitude": 34.771
        },
        "notes": "The shelter is located in the plaza behind house number 12. Access is from Pastelucy Street; at house number 12, turn right onto Path 3883 (Anna and Ventsianov), and then right into the plaza between the houses.",
        "accessibility": true
    },
    {
        "address": "Kehilat Canada 3",
        "capacity": 100,
        "coordinates": {
            "latitude": 31.971,
            "longitude": 34.774
        },
        "notes": "The shelter is located in the yard of the 'Canadian House' Center. There is a main entry on Kehilat Canada 5, and the shelter is in the left corner of the yard. There is a secondary access route from the rear side via the public park.",
        "accessibility": true
    },
    {
        "address": "Bar Knesset 16",
        "capacity": 75,
        "coordinates": {
            "latitude": 31.967,
            "longitude": 34.776
        },
        "notes": "The shelter is located at the back of the community center next to the parking lot.",
        "accessibility": true
    },
    {
        "address": "Be'er Sheva 15",
        "capacity": 60,
        "coordinates": {
            "latitude": 31.966,
            "longitude": 34.770
        },
        "notes": "The shelter is located near the public garden.",
        "accessibility": true
    },
    {
        "address": "Tze'elim 40",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located opposite 'Gan Rappaport' at the corner of Bat Ein 5.",
        "accessibility": true
    },
    {
        "address": "Tze'elon HaRofe 3",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located opposite house number 6, near Fuad Ismail Dgani Square.",
        "accessibility": true
    },
    {
        "address": "Ashdod 7",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located opposite house number 14, next to a grove and a public garden.",
        "accessibility": true
    },
    {
        "address": "Shderot Chabad 26",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "At the corner of Rabbi Mefashischa 4. The shelter is located opposite Bat Ein 18, in the plaza.",
        "accessibility": true
    },
    {
        "address": "Nahal Sorek 5",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located within the premises of two schools - 'Chabad Bnot' and 'Yafe Nof', with an entrance to the shelter in each school. Enter from the main gate towards the shelter.",
        "accessibility": true
    },
    {
        "address": "Yisrael Marizin 9",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located at the end of the street in the area between buildings 5, 6, 9 opposite the parking. The shelter itself is opposite house number 9. Access can be from Dov Mamritz 17 or 15 and then right or left onto Marizin Street.",
        "accessibility": true
    },
    {
        "address": "Shivtei Yisrael 77",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located on the grounds of 'Kulanah Yachad' school. Enter from the main gate, straight, go down the stairs, and the shelter is on the right.",
        "accessibility": true
    },
    {
        "address": "Ohev Yisrael 12",
        "capacity": 100,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located in the heart of 'Los Angeles' garden between houses 12 and 14. Access to the shelter can also be through Katz Yaakov Yosef 17 and Shderot Chabad 46 through the garden. The shelter has a sliding door that opens in emergencies and requires manual moving for full opening.",
        "accessibility": true
    },
    {
        "address": "Pasteluci 12",
        "capacity": 90,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located in the plaza behind house number 12. Access is from Pasteluci Street; at house number 12, turn right onto Path 3883 (Anna and Vancianov), and then right into the plaza between the houses where the shelter is located.",
        "accessibility": true
    },
    {
        "address": "Pasteluci 31",
        "capacity": 90,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located on the grounds of 'Lev Yafo Al Zahraa' school - reach the end of Pasteluci Street near house number 29, find the school entrance gate and turn left towards the open basketball court, the shelter is at its end.",
        "accessibility": true
    },
    {
        "address": "The Lotus 12",
        "capacity": 75,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located opposite house number 12 in the public plaza. Access to the shelter can also be from Yefet 120 Street.",
        "accessibility": true
    },
    {
        "address": "Shazar Zalman 39",
        "capacity": 216,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located on the grounds of 'Bnot Zipora' school and has two main entrances. The main entrance is through the school gate, straight and right between the kindergarten building and the school until the entrance. Entrance 2 is from the street through the gate with the code to the kindergarten and playground.",
        "accessibility": true
    },
    {
        "address": "Arlich 3",
        "capacity": 60,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located opposite 'Gan HaShnayim'. On Arlich Street, opposite house number 2, there is parking adjacent to Gan HaShnayim, and the shelter is at the end of the parking lot.",
        "accessibility": true
    },
    {
        "address": "Ramat Gan 22",
        "capacity": 120,
        "coordinates": {
            "latitude": 32.0854,
            "longitude": 34.7858
        },
        "notes": "The shelter is located in the city hall. Access to the shelter is from the main entrance of the city hall, straight into the building, then down to the basement floor.",
        "accessibility": true
    }
];

 

// async function seedDB() {
//     try {
//         await connectDB(); 
//         await Task.deleteMany({});
//         await User.deleteMany({});


//         const createdUsers = await Promise.all(
//             users.map(async (u) => {
//                 const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS); 
//                 const user = new User({ ...u, password: hashedPassword }); 
//                 await user.save(); 
//                 return user;
//             })
//         );


//         const tasksWithUsers = tasks.map((task, index) => {
//             return {
//                 ...task,
//                 user: createdUsers[index % createdUsers.length]._id,
//             };
//         });

//         const createdTasks = await Task.insertMany(tasksWithUsers);

//         for (let task of createdTasks) {
//             await User.findByIdAndUpdate(
//                 task.user,
//                 { $push: { tasks: task._id } },
//                 { new: true, useFindAndModify: false }
//             );
//         }

//         console.log("Database seeded");
//     } catch (err) {
//         console.error(err);
//     } finally {
//         mongoose.connection.close(); // Close the database connection
//     }
// }

// seedDB();

async function seedDB() {
    try {
        await connectDB(); 
        await Shelter.deleteMany({});
        await User.deleteMany({});


        const createdUsers = await Promise.all(
            users.map(async (u) => {
                const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS); 
                const user = new User({ ...u, password: hashedPassword }); 
                await user.save(); 
                return user;
            })
        );


        const sheltersWithUsers = shelters.map((shelter, index) => {
            return {
                ...shelter,
                user: createdUsers[index % createdUsers.length]._id,
            };
        });

        const createdShelters = await Shelter.insertMany(sheltersWithUsers);

        for (let shelter of createdShelters) {
            await User.findByIdAndUpdate(
                shelter.user,
                { $push: { shelters: shelter._id } },
                { new: true, useFindAndModify: false }
            );
        }

        console.log("Database seeded");
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}

seedDB();