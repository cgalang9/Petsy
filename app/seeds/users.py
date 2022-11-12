from app.models import db, User, environment, SCHEMA, Product, ProductImage, Review, ReviewImage


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    mike = User(
        username="Mike's Pet Emporium", email='mike@aa.io', password='password123')
    johnny = User(
        username="Johnny's cash exchange", email='johnny@aa.io', password='password')
    kat = User(
        username="Kat's cat stuff", email='kat@aa.io', password='password')
    jumbo = User(
        username='Mumbo Jumbo Pet Supplies', email='jumbo@aa.io', password='password')
    bo = User(
        username='Bo Knows Dogs', email='bo@aa.io', password='password')
    tarot = User(
        username="Tarot's for Parrots", email='tarot@aa.io', password='password')
    sanford = User(
        username='Sanford and Sons Pet Supplies', email='sanford@aa.io', password='password')
    miller = User(
        username='Miller Pets', email='miller@aa.io', password='password')
    cozey = User(
        username='Cozey Critters', email='cozey@aa.io', password='password')
    joe = User(
        username="Joe Exotic's Pet Supplies", email='joe@aa.io', password='password')
    pitbull = User(
        username="Mr Worldwide's Pitbull Store", email='pitbull@aa.io', password='password')
    chris = User(
        username="Chris' Cattery", email='chris@aa.io', password='password')

    users = [demo, mike, johnny, kat, jumbo, bo, tarot, sanford, miller, cozey, joe, pitbull, chris]

    for user in users:
        db.session.add(user)
        db.session.commit()
    
    seed_data = [
    {
        "user_id": 2,
        "name": "Personalized Dog Bed",
        "price": 53.99,
        "description": "The comfiest dog bed money can buy",
        "product_images": ["https://i.etsystatic.com/21637299/r/il/54efa6/2109724800/il_794xN.2109724800_sdo1.jpg", "https://i.etsystatic.com/21637299/r/il/4fb10b/2100965646/il_794xN.2100965646_r2b8.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Our dog loves her new bed! It’s such great quality and so soft! Our pitt mix pup is 50 lbs, and we got the large! It’s a perfect size so she still has room to snuggle and move around.",
            "review_images": ["https://i.etsystatic.com/iap/dc1fdc/4291261405/iap_640x640.4291261405_5p9t9mcu.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "We received this yesterday and it exceeds our expectations! This dog bed is so well made and complements our decor. We couldn’t be happier and Lucy, our puppy loves it. Thank you!",
            "review_images": ["https://i.etsystatic.com/iap/b4e5dc/3396813168/iap_640x640.3396813168_mhxcqlct.jpg?version=0"]
            }
        ]
    },

    {
        "user_id": 2,
        "name": "Personalized Dog Robe",
        "price": 28,
        "description": "Pamper your pup in true spa-like style with this cuddly soft robe featuring a cozy hood and an absorbent quick-drying design",
        "product_images": ["https://i.etsystatic.com/11219945/r/il/b296a5/3198246561/il_1140xN.3198246561_hk7l.jpg", "https://i.etsystatic.com/11219945/r/il/f5da74/3404674236/il_1140xN.3404674236_gww9.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Oh my gosh! Amazing! My little baby loves it! The weather is getting colder and she needed this for bath time!",
            "review_images": ["https://i.etsystatic.com/iap/3e090e/3460717491/iap_640x640.3460717491_rzkp5pk0.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "Got each of my girls a robe - Pink for Izzie and Aqua for Emmie. Robes are well made and so cute on each girl. Hoods are a plus. Their names are each embroidered very nicely as are the doggie paws. I would definitely order from this vendor again.",
            "review_images": []
            }
        ]
    },

    {
        "user_id": 2,
        "name": "Personalized Dog Treats",
        "price": 15,
        "description": "Jake's is getting personal! Due to the high number of customer request for personalizing dog treats, we are offering this fun service. These treats make great gifts for a new pup, parties, weddings, or advertising your business. The maximum number we can stamp on our 2 inch bone is 9 letters.",
        "product_images": ["https://i.etsystatic.com/10516948/r/il/be81be/1699380446/il_1140xN.1699380446_7s04.jpg", "https://i.etsystatic.com/10516948/r/il/69e6b4/1746731087/il_1140xN.1746731087_rzjn.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "These were perfect! I work at a doggy daycare and we had a dog who was such a treat phein and we got her treats with her name on it as a going away gift when they moved. SOOOO happy with this purchase!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "An awesome Birthday gift for a sweet pup! These personalized treats were extra special and paired perfectly with one special Happy Birthday treat! Akela thought they tasted pretty great too!! SUPER fast shipping and delivery! Thank you!!",
            "review_images": []
            }
        ]
    },

    {
        "user_id": 2,
        "name": "Cat Toys -- Organic Wool!",
        "price": 10.97,
        "description": "100 percent biodegradable, renewable, sustainable and certified cruelty-free kiwi wool. Each cat Mouse is hand-felted with love from 100% natural organic wool to ensure a happy and healthy kitty.",
        "product_images": ["https://i.etsystatic.com/32942464/r/il/871835/4245716966/il_1140xN.4245716966_b6cx.jpg", "https://i.etsystatic.com/32942464/r/il/c86551/4245626188/il_1140xN.4245626188_9993.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Marley is already loving his mice just nice simple mice, i really like the size for him. But he’s loving his mice. Thank you so very much. I will definitely be back soon. I’m Wanting to try out the dryer balls sometime . Thank you.",
            "review_images": ["https://i.etsystatic.com/iap/5b6ee3/4316884328/iap_640x640.4316884328_pee705a3.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "These little mice are beautiful and a perfect Christmas gift for a cat lover friend of mine!",
            "review_images": []
            }
        ]
    },
    {
        "user_id": 2,
        "name": "Plush Squeaky Toy For Puppies",
        "price": 13.99,
        "description":  "There are 7 design squeaky dogs , Polyester Fiber Fill Dog Toy perfect gift for small, medium breeds",
        "product_images": ["https://i.etsystatic.com/17360662/r/il/0d5f32/4243920725/il_1140xN.4243920725_a49y.jpg", "https://i.etsystatic.com/17360662/r/il/c098ea/4196250530/il_1140xN.4196250530_qatv.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Very cute. My pup loved it immediately. It was a gift for her birthday. She’s hard on toys and did rip it almost immediately. It’s ok, I’m used to sewing her toys.",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "The cute little stuffed dog was lovely. Well crafters, arrived on time, and with a hand written gift card to my friend and her new fur baby!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "So cute! Looks just as pictured!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Loved them!",
            "review_images": []
            }
        ]
    },
    {
        "user_id": 3,
        "name": "Cash Dog Tag",
        "price": 19,
        "description":  "Please note, that each tag is made to order. Let's embrace imperfections as they do happen on handmade items!",
        "product_images": ["https://i.etsystatic.com/32995477/r/il/0453a3/4259870907/il_1140xN.4259870907_8z2z.jpg", "https://i.etsystatic.com/32995477/r/il/05418f/4259874189/il_1140xN.4259874189_4p7j.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "The tag turned out perfect! Everyone comments how cool it is. I requested a custom tag with mini chocolate chips and Audra happily completed it and quickly at that. I want to order more tags for my other pets now!",
            "review_images": ["https://i.etsystatic.com/iap/97c118/4257881012/iap_640x640.4257881012_qf1zn0gy.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "I absolutely LOVE how this tag turned out! I couldn’t make a decision on a font, so I chose to be surprised and I am NOT disappointed! Thank you so much, it matches Keller’s new collar perfectly!",
            "review_images": ["https://i.etsystatic.com/iap/90a261/4098147602/iap_640x640.4098147602_j4nusfwm.jpg?version=0"]
            }
        ]
    },
    {
        "user_id": 3,
        "name": "Pet Bling",
        "price": 19.99,
        "description": "Pet Bling Dog Dollar Sign Pendant (free gold necklace - one size)",
        "product_images": ["https://i.etsystatic.com/8286341/r/il/6b9514/3149209015/il_1140xN.3149209015_tfk4.jpg", "https://i.etsystatic.com/8286341/r/il/a89138/3149196617/il_1140xN.3149196617_2dj9.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "I got the 22” chain for my blue pitty. She looks so cute haha. It also still looks good with a normal color. Seems well made and has a good quality latch!",
            "review_images": ["https://i.etsystatic.com/iap/b4e79a/3742961320/iap_640x640.3742961320_gbzs5744.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "Thank you!!! My dog is so styling now!!!",
            "review_images": ["https://i.etsystatic.com/iap/b4e79a/3742961320/iap_640x640.3742961320_gbzs5744.jpg?version=0"]
            }
        ]
    },
    {
        "user_id": 3,
        "name": "Money Dog or Cat Collar",
        "price": 10.99,
        "description": "Fun money pattern for this Dog collar or Cat Collar. This material really looks like money. :-)",
        "product_images": ["https://i.etsystatic.com/5520396/r/il/f1e105/481667435/il_1140xN.481667435_djsl.jpg", "https://i.etsystatic.com/5520396/r/il/1fb34a/481632844/il_794xN.481632844_ftcj.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Love it! My boy has cost me a small fortune in the 2 months I've owned him so this collar is absolutely appropriate for around his neck.",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Love this money collar! My boy, Cash hasn’t tried to fight this one off~the collar sits comfortably and is well-made. Great communication from the seller, absolutely recommend!",
            "review_images": ["https://i.etsystatic.com/iap/e054f5/2296664261/iap_640x640.2296664261_m2xt6wid.jpg?version=0"]
            }
        ]
    },

    {
        "user_id": 3,
        "name": "Bark of America dog toy",
        "price": 39.51,
        "description": "Brighten up your furry friends bed with this Funny Bark of America dog toy. It also squeaks when squeezed!",
        "product_images": ["https://i.etsystatic.com/25062291/r/il/a15231/3531469401/il_1140xN.3531469401_98y2.jpg", "https://i.etsystatic.com/25062291/r/il/65d433/3683266068/il_794xN.3683266068_63er.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "Super Fantastic, pricey though, even though my little diva takes pretty good care of her toys, especially purses because I paid so much for this, over two times what I would for any other Faux Designer Doggie hand bag. This is not made as strong as others I have Purchased so it may just come out during special occasions when we have guest. I LOVE IT THOUGH VERY MUCH.",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Great seller, beautiful products! Very responsive and caring to my questions/concerns. Her products are beautiful and made very well. My only advice is to look at the dimensions of the product to make sure the size of the products is right for your pet before ordering! But the seller is great and I would order from her again. Thanks for your hard work, and beautiful product for my spoiled puppy!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Everything right down to the lovely packaging is five stars, highly recommend this shop to everyone!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Such fabulous and fun designs! My pup loves her new toys!",
            "review_images": []
            }
        ]
    },
    {
        "user_id": 3,
        "name": "Your Pet on a Dollar",
        "price": 10.99,
        "description": '''~ Now, it is time for you to have your pet's picture on REAL, Spendable Money! ~

        Your pet will be forever remembered and celebrated on this real dollar bill!''',
        "product_images": ["https://i.etsystatic.com/10703188/r/il/d6db62/1490374685/il_1140xN.1490374685_qp2o.jpg", "https://i.etsystatic.com/iap/c04359/3547180662/iap_640x640.3547180662_7i3ymeeo.jpg?version=0"],
        "reviews": [
            {
            "rating": 5,
            "text": "Great quality! Gifts for friends, they loved them!",
            "review_images": []
            },
            {
            "rating": 1,
            "text": "Never received my order !",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Fine dollar bill and neatly packaged. Reliable and recommendable. Image is 100% which corresponds to the order. Valuable banknotes with the never-to-be-forgotten twin towers",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Beautiful Snoopy ,lovely centre design ,good clean crisp note I wouldn't expect anything less from this quality top rated seller ,she'll love it and will be asking for Tom Hanks soon I guarantee 12 stars.",
            "review_images": []
            }
        ]
    },



    {
        "user_id": 4,
        "name": "Catnip Joints",
        "price": 7.28,
        "description": "Not all cats have extra thumbs... and the ones that do aren't good at using them anyway. Treat your cat to a pre-roll to make things easy.",
        "product_images": ["https://i.etsystatic.com/14817346/r/il/84e1fb/4105290974/il_1140xN.4105290974_d8t5.jpg", "https://i.etsystatic.com/14817346/r/il/6885b6/4152911669/il_1140xN.4152911669_bv2d.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "I was in love with these from the moment I came across Sarah’s shop! Funny, adorable, high quality, and fast arrival... I suppose the most important is that Leo loves them too!",
            "review_images": ["https://i.etsystatic.com/iap/cca1ed/4130465473/iap_640x640.4130465473_e5x2gfxs.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "My cat loves her new toy, she goes absolutely nuts for it!! Plus it’s fun to show my co workers the pictures I have of her playing with it :)",
            "review_images": ["https://i.etsystatic.com/iap/c0e1d8/4130467897/iap_640x640.4130467897_orvs4qz3.jpg?version=0"]
            }
        ]
    },
    {
        "user_id": 4,
        "name": "Emerald Cat Collar",
        "price": 30.87,
        "description": "Stunning large Sparkling Emeralds & Diamond Crystals set on a faux leather collar",
        "product_images": ["https://i.etsystatic.com/6402885/r/il/6e0f2a/1856906838/il_1140xN.1856906838_dflj.jpg", "https://i.etsystatic.com/iap/27d15e/3771050581/iap_640x640.3771050581_nlzcgtdo.jpg?version=0"],
        "reviews": [
            {
            "rating": 5,
            "text": "Oh this is so SO darling on my handsome baby I couldn’t get hedwig to sit perfectly still but he really does seem to adore his new collar",
            "review_images": ["https://i.etsystatic.com/iap/5af4c2/2459291218/iap_640x640.2459291218_il6rp3w9.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "Beautiful collar, very well made, excellent service- Nala and I couldn’t be happier! Will be ordering more in the future!",
            "review_images": ["https://i.etsystatic.com/iap/ec0cde/2165188032/iap_640x640.2165188032_i9hjbza8.jpg?version=0=0"]
            }
        ]
    },

    {
        "user_id": 4,
        "name": "Interactive Cat Toy",
        "price": 11.90,
        "description": "Hands Free Cat Wand, Stand Up Cat Toy, Suction Cup Cat Wand (6.8x4.5x17cm). This cat toy is designed for those busy cat owners who have a lot on there plate day-to-day, but also want to give attention to their pet. Simply suction to you desired spot and let your pet do the rest.",
        "product_images": ["https://i.etsystatic.com/6402885/r/il/6e0f2a/1856906838/il_1140xN.1856906838_dflj.jpg", "https://i.etsystatic.com/38243747/r/il/eb03b6/4268021086/il_794xN.4268021086_h543.jpg"],
        "reviews": []
    },

    {
        "user_id": 4,
        "name": "Catnip Infused Felt Balls",
        "price": 8.50,
        "description": "Catnip infused Felted Balls have all the power of catnip without the mess of loose catnip. Fair Trade felted balls come fully charged with B Happy (Our custom catnip blend) and ready for play. When kitty seems to lose interest in the balls, return them to the tin to recharge. The Catnip pod in the bottom of the tin will magically recharge the balls. Please allow 24-48 hours for balls to fully recharge.",
        "product_images": ["https://i.etsystatic.com/8678713/r/il/a50e72/2579419192/il_1140xN.2579419192_dix2.jpg", "https://i.etsystatic.com/8678713/r/il/519fb3/2627081377/il_1140xN.2627081377_2fea.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "These are so cute! The packaging is smart -- they can be 'recharged' with an enclosed catnip tea bag -- and they're the right size and weight even for my furry little goober. I love the combination of colors, too!",
            "review_images": ["https://i.etsystatic.com/iap/6be6dc/4293217550/iap_640x640.4293217550_42j81ogy.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "My kitties love their new toys! They are always playing with them & I am thrilled with my purchase!",
            "review_images": ["https://i.etsystatic.com/iap/c884ca/4285305588/iap_640x640.4285305588_9a4z6kr8.jpg?version=0"]
            }
        ]
    },

    {
        "user_id": 4,
        "name": "Scratch Post",
        "price": 116.93,
        "description": "Lovely modern scratching post",
        "product_images": ["https://i.etsystatic.com/26068660/r/il/c65709/3286818439/il_1140xN.3286818439_8xdv.jpg", "https://i.etsystatic.com/26068660/r/il/bf88bc/3474025549/il_1140xN.3474025549_29jw.jpg"],
        "reviews": [
            {
            "rating": 5,
            "text": "This post exceeded my expectations. It is so sturdy and well made. The materials are phenomenal. To top it all off, it isn’t ugly. Looks amazing in my living room.",
            "review_images": ["https://i.etsystatic.com/iap/54dd2d/4268414418/iap_640x640.4268414418_5kxhlqx0.jpg?version=0"]
            },
            {
            "rating": 5,
            "text": "Excellent quality and really beautiful. Does not take up a lot of space, but tall enough for my cats to stretch. Base is thick and heavy, keeping the post stable. Highly recommend!",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Just got mine a few days after making the purchase. I’m shocked how fast I got it considering where it was shipping from. It’s gorgeous and very high quality.",
            "review_images": []
            },
            {
            "rating": 5,
            "text": "Not yet cat tested, but looks fantastic in the room. We think it will be a hit with our six-month old kitten. Thanks for making something both functional and beautiful.",
            "review_images": []
            }
        ]
    },

    {
    "user_id": 5,
    "name": "Plush Dragon Dog Toy",
    "price": 16.74,
    "description": "Lovely plush dragon toy that both you and your furbaby will love. Super durable and made of sustainable materials",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/1349074-center-5", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/1349074-center-4"],
    "reviews": [
        {
        "rating": 1 ,
        "text": "My frenchie puppy had the squeaker punctured in about 2 minutes and the whole thing ripped open in the first hour.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/05b1f7fa-fd2a-52d8-a6df-e48e24a8bd80"]
        },
        {
        "rating":5 ,
        "text": "I was really surprised to read the poor reviews on this toy. These toys are the only soft toys that have held up for my cocker spaniel. He loves soft toys but destroys them within a day or two, but not these soft toys!",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 5,
    "name": "Plush Sloth Mermaid Dog Toy",
    "price": 5.14,
    "description": "This plush sloth mermaid is a funky treat your pup will love. Soft plush is cuddly and squeaker and crackle make delightfun sounds",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3486456-center-1", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3486456-center-3"],
    "reviews": [
        {
        "rating": 5,
        "text": "My puppy is four months old and absolutely loves the crinkle! We’ve had it for two weeks and she did puncture it going for the squeaker so I remove the squeaker and stitched our precious sushi back up and she’s good for at least a couple more weeks of play.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/5bbef906-3518-57fe-894c-a7e6945a4823"]
        },
        {
        "rating": 4,
        "text": "I purchased this a few weeks ago as a car toy for my pet on long rides. He loves it!",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 5,
    "name": "Window Teaser Assorted Cat Toy",
    "price": 9.89,
    "description": "The KONG window Teaser affixes to smooth surfaces, creating an active challenge for cats, even when you're not available to play. Each toy contains KONG Premium North American Catnip, bright feathers and a crinkle sound for added stimulation.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/2402046-center-1", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/2402046-center-2"],
    "reviews": [
        {
        "rating": 5,
        "text": "Both of our cats love this toy!! Stays where we put it real well!! Our cats have already chewed the toy off the first one & we have already replaced it!!",
        "review_images": []
        },
        {
        "rating": 2,
        "text": "Would have given this product 5 stars because my cat LOVES this toy, but it broke very very quickly. Wish they made the attachments stronger, but I guess things are bound to break when they get used every day!",
        "review_images": []
        },
        {
        "rating": 3,
        "text": "Only lasted overnight. They bit the elastic. Cats 3. Birds 0. Would buy again on sale, but $9 per catnip bird is a little steep in my opinion. Haha",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 5,
    "name": "EveryYay Essentials Pink Snooze Fest Dog Bed Bundle, 22 inch L X 18 inch W",
    "price": 35.67,
    "description": "Make your fur babies dreams come true with the EveryYay Essentials Pink Snooze Fest Dog Bed Bundle. This 3-piece set includes a nester bed with the coziest sleep surface, a cuddly plush throw and a bone-shaped squeak toy so they can head right into playtime after naptime.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/3323825-center-1", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3323825-center-4"],
    "reviews": [
        {
        "rating": 5,
        "text": "My dog loves this bed and the bone pillow that comes with it. Its the cutest pink. The pillow and blanket are an added bonus.",
        "review_images": []
        },
        {
        "rating":3,
        "text": "It took a long time to get here, and it was pretty small, even though my Min-Pin is small. She likes to stretch out, and this is more cat sized that small dog size. So far, the cats have not even used it! I have hope tho!",
        "review_images": []
        },
        {
        "rating":3,
        "text": "This is the 2nd bed I purchased for my puppy. I wanted her to hzve her choice where she wanted to nap or sleep and be warm and cozy. I had this bed for 13 years with my previous dog Luna and she loved it.",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 5,
    "name": "Multipet Medium Yellow Pineapple House",
    "price": 12.99,
    "description": "A cozy place to relax for your small animal companion. Made of soft fleece. Includes convenient hang tabs and clips to allow the flexibility to hang or sit on the floor.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/2160147-left-1", "https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/7b1e3da3-18be-5249-a198-59ebe31aea2d"],
    "reviews": [
        {
        "rating": 4,
        "text": "My rats love it but its a pain to clean. Well, you're not suppose to submerge it, but that sure would be easier. Looking for something similar but washable now.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/70bc3f60-5f44-5049-8ea1-2962ca601da4"]
        },
        {
        "rating": 3,
        "text": "Bought it for our guinea pigs. They were 2 months old and they could fit then. We had it about a month and the rope pieces are barely hanging on and a spot in the seam is coming undone. It’s sad because 1 guinea pig still likes to sleep with his head in the pineapple",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 6,
    "name": "Sherpa Reversible Dog Jacket",
    "price": 50.89,
    "description": "The Sherpa Reversible Jacket from Reddy features a cute camo design on one side and a cozy sherpa lining on the other. Light polyfill with sonic weld detailing keeps your pup especially cozy on windy mornings and cooler afternoons.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/3537954-center-11", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3537954-center-10"],
    "reviews": [
        {
        "rating": 4,
        "text": "I bought this two days ago before I went on a 14 mile hike with my pup. It kept him warmed",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/c80f39d7-7f0a-542c-ab91-8870aad3a587"]
        },
        {
        "rating": 5,
        "text": "I purchased a small for my Maltipoo and it fits perfectly. The back zipper makes it so convenient to put on and take off.",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 6,
    "name": "Bootique Dog & Cat Taco Costume",
    "price": 18.99,
    "description": "Your pet will be taco the town in this Taco Costume from Bootique. A hook and loop closure that makes it easy peasy to secure this costume for your pet during trick or treating, photoshoots, or greeting little goblins.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/3568144-center-1", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3568144-center-10"],
    "reviews": [
        {
        "rating": 5,
        "text": "I got a 3XL for my golden retriever mix and it fit he perfectly. He doesn’t like anything on his head so this costume was perfect and now he’s ready for Halloween!",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/1f6b98e4-e085-59ea-bd3f-628ab6e09e17"]
        },
        {
        "rating": 4,
        "text": "Cute costume. Seems to be a little bit higher quality than some of the costumes on the market right now. Easy to get on/off as dog doesn’t have to put paws through any holes to get in.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/869be58b-ce43-51ae-abba-4d99e82087b5"]
        }
    ]
    },
    {
    "user_id": 6,
    "name": "The Green Rain Dog Jacket",
    "price": 80.99,
    "description": "The Green Dog Rain Jacket helps keep rainy days from getting in the way of enjoying the outdoors. The shielded leash portal provides additional protection from the rain so you can enjoy an un-furgettable adventure.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3478641-center-6", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3478641-center-4"],
    "reviews": [
        {
        "rating": 4,
        "text": "The raincoat we ordered for my American Staffordshire Terrier is great except for one thing. The zipper. It's so hard to zip it up. Velcro would be better. I might add vecro straps to it.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/93a406fb-047a-5e71-99ee-921b05b3fa0c"]
        },
        {
        "rating": 5,
        "text": "Love this raincoat! Fit my dog perfectly ! He loves it.",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/120b4519-3920-55dd-a571-61bf77c35158"]
        }
    ]
    },
    {
    "user_id": 6,
    "name": "Bootique Dog & Cat Pumpkin Hoodie",
    "price": 10.99,
    "description": "This Pumpkin Hoodie from Bootique is pick of the patch this Halloween! Your pet will love its coziness and you'll love that it's machine washable!",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3568013-center-2", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/3568013-center-10"],
    "reviews": [
        {
        "rating": 5,
        "text": "I just bought this a few days ago. It’s soft and doesn’t seem to bug my dog to wear it, but it does run small. ",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/39b30263-1b21-54e6-a822-0c7cde85d0ee"]
        },
        {
        "rating": 3,
        "text": "They're cute! The only issue I have is I just wish the hoods fit better...",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/08331b1e-fcc9-566d-99cd-ff9f11e5db5e"]
        }
    ]
    },
    {
    "user_id": 6,
    "name": "Prehistoric Fun Dinosaur Plush Dog Toy",
    "price": 5.89,
    "description": "Prehistoric Fun Dinosaur Plush Dog Toy delights your doggo in a great deal of fun. From thrilling textures to squeaky surprises, our Petco toys treat them to twice as much entertainment with the perfect duo of playtime pals.",
    "product_images": ["https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/1501666-center-1", "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_468,w_500/c_pad,h_468,w_500/1501666-center-3"],
    "reviews": [
        {
        "rating": 5,
        "text": "My 16 year chihuahua never in her life has played with toys (she is a rescue) and as soon as she saw this Dino she went crazy for it! Highly recommend this!",
        "review_images": []
        },
        {
        "rating": 5,
        "text": "I just bought this less than a week ago and my smaller dog is only about 25 lb so this was the perfect squeaky toy size for her-she loves it!",
        "review_images": ["https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cGV0Y28/cfb63535-81aa-5d65-ad07-3ddc0c2e60c3"]
        }
    ]
    },
    {
    "user_id": 7,
    "name": "LARGE parrot TOY ** FIRECRACKER ** perfect for pluckers and foragers",
    "price": 27.00,
    "description": "This large toy includes lots of birdie bagels, crinkle paper, finger traps, marbella beads and a roll of paper on an extra large birdie bagel base. A must have for parrots that pluck!! Comes with a pear hook for hanging.",
    "product_images": ["https://i.etsystatic.com/6911893/r/il/07e788/1077917957/il_1588xN.1077917957_8ymq.jpg", "https://i.etsystatic.com/6911893/r/il/4750df/1159290852/il_1588xN.1159290852_ii7m.jpg"],
    "reviews": [
        {
        "rating": 5,
        "text": "This ring is BIG! Or in my African Greys words meh. Its a tiny bit small!",
        "review_images": []
        },
        {
        "rating": 5,
        "text": "I chose this for our B&G Macaw rescue, Max. When we got him his chest was bare, now its finally starting to fill in. This toy is apparently another favorite.",
        "review_images": ["https://i.etsystatic.com/iap/e03900/1094898254/iap_300x300.1094898254_4az9xfql.jpg?version=0"]
        }
    ]
    },
    {
    "user_id": 7,
    "name": "Hanging Bird Toy for Parrots",
    "price": 13.71,
    "description": "The hanging toy is made of birch blocks, jute rope, cardboard sheets, acriylic mirrors and small bells. Easily and quickly hung in a cage or elsewhere with a small carabiner (included).",
    "product_images": ["https://i.etsystatic.com/37950554/r/il/df9d32/4342180663/il_1588xN.4342180663_akl3.jpg", "https://i.etsystatic.com/37950554/r/il/b2734a/4294683220/il_1588xN.4294683220_26bd.jpg"],
    "reviews": []
    },
    {
    "user_id": 7,
    "name": "Mega Parrot Stand",
    "price": 2250.00,
    "description": "The Strongest Organic parrot wood available in the entire United States is used to create all Mega Parrot Stand. Each Mega Parrot Stand is completely unique and strategically designed to fit the birds.",
    "product_images": ["https://i.etsystatic.com/25796398/r/il/893901/2758276236/il_1588xN.2758276236_i8rr.jpg", "https://i.etsystatic.com/25796398/r/il/0fc5dc/2758276266/il_1588xN.2758276266_sr9d.jpg"],
    "reviews": [
        {
        "rating": 5,
        "text": "I’m really happy with the way the bird stand turned out. It arrived sooner than I expected and the seller was very kind and helpful as well!",
        "review_images": ["https://i.etsystatic.com/iap/979e19/2805942635/iap_300x300.2805942635_464gdqdk.jpg?version=0"]
        },
        {
        "rating": 5,
        "text": "Order a mega for the indoor, bulk wood for outdoor and a table top for office. ",
        "review_images": ["https://i.etsystatic.com/iap/6ad3a5/3810531706/iap_300x300.3810531706_6qq53lxu.jpg?version=0"]
        }
    ]
    },
    {
    "user_id": 7,
    "name": "UP AND OVER botllebrush toy",
    "price": 31.99,
    "description": "This bird toy is a great addition to any setup. Full of wood to chew and rip apart, this toy will keep any wood loving parrot busy for hours at a time.",
    "product_images": ["https://i.etsystatic.com/23144235/r/il/d75b42/3950341158/il_1588xN.3950341158_60mv.jpg", "https://i.etsystatic.com/23144235/r/il/65a421/3774771638/il_1588xN.3774771638_kb4s.jpg"],
    "reviews": [
        {
        "rating": 5,
        "text": "My geriatric Rosey Bourke (20 years oldwith gout (being treated with meds) is loving her new bottle brush perch!",
        "review_images": ["https://i.etsystatic.com/iap/2f799b/4241015177/iap_300x300.4241015177_wn1tqefi.jpg?version=0"]
        },
        {
        "rating": 4,
        "text": "My bird just loved this toy. Her favorite parts are the mahogany pieces. It didn’t last real long but it made her happy!!",
        "review_images": []
        }
    ]
    },
    {
    "user_id": 7,
    "name": "Can-o-Nuts Indestructible",
    "price": 12.99,
    "description": "Bonka Bird Toys 60002 Small Can-o-Nuts Birds is an interactive toy for your small to medium-sized cherished feathered friends",
    "product_images": ["https://i.etsystatic.com/7045787/r/il/f2da2c/4146973094/il_1588xN.4146973094_tth9.jpg", "https://i.etsystatic.com/7045787/r/il/7399ca/4194635027/il_1588xN.4194635027_c7py.jpg"],
    "reviews": [
        {
        "rating": 5,
        "text": "Its so much larger than I thought! I hope my Lucy bird loves it as much as I do!!",
        "review_images": ["https://i.etsystatic.com/iap/7ba83f/4313527508/iap_300x300.4313527508_9wgue2ax.jpg?version=0"]
        },
        {
        "rating": 1,
        "text": "I thought I ordered from the small section. This thing is big enough for a macaw. I have it in my conures cage and he isn't afraid of it so that's good",
        "review_images": []
        }
    ]
    }

    ]

    for seed in seed_data:
        new_product = Product(
            user_id=seed["user_id"],
            name=seed["name"],
            price=seed["price"],
            description=seed["description"],
        )
        db.session.add(new_product)
        db.session.commit()


        for i, url in enumerate(seed["product_images"]):
            preview_image = False
            if i == 0:
                preview_image = True
            new_product_image = ProductImage(
                product_id=new_product.id,
                url=url,
                preview_image=preview_image
            )

            db.session.add(new_product_image)
        
        db.session.commit()

        new_id = new_product.id + 1
        if new_id > 13:
            new_id = 12

        for review in seed["reviews"]:
            new_review = Review(
                user_id = new_id,
                product_id=new_product.id,
                text=review["text"],
                rating=review["rating"]
            )
            db.session.add(new_review)
            db.session.commit()

            if review["review_images"]:
                new_review_image = ReviewImage(
                    review_id=new_review.id,
                    url=review["review_images"][0]
                )
                db.session.add(new_review_image)
                db.session.commit()

    

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
