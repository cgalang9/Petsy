from app.models import db, User, environment, SCHEMA


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
    joe = User(
        username="Joe Exotic's Tiger Supplies", email='joe@aa.io', password='password')
    cozey = User(
        username='Cozey Critters', email='cozey@aa.io', password='password')
    pitbull = User(
        username="Mr Worldwide's Pitbull Store", email='pitbull@aa.io', password='password')
    chris = User(
        username="Chris' Cattery", email='chris@aa.io', password='password')

    users = [demo, mike, johnny, kat, jumbo, bo, tarot, sanford, miller, cozey, joe, pitbull, chris]

    for user in users:
        db.session.add(user)
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
