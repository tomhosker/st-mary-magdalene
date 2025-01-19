-- This code adds some test data to the database.

-- Run me using:
--   heroku pg:psql --app [APP_CODE] < [PATH_TO_THIS_FILE]

INSERT INTO UserLoginDetails (
    id,
    username,
    hashed_password
) VALUES (
    1,
    'admin',
    '84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec'  -- Hash of "guest".
);

INSERT INTO RealWorldAddress (
    code,
    short_name,
    is_parish_church,
    is_linked_church,
    house_name,
    house_number,
    road_name,
    town,
    post_town,
    postcode
) VALUES (
    'st-mary-magdalene',
    'St Mary Magdalene',
    true,
    false,
    'St Mary Magdalene Roman Catholic Church',
    null,
    'Morrell Street',
    'Maltby',
    'Rotherham',
    'S66 7LH'
), (
    'st-marys-edlington',
    'St Mary''s Edlington',
    false,
    true,
    'St Mary''s Catholic Church',
    null,
    'Bungalow Road',
    'Edlington',
    'Doncaster',
    'DN12 1DL'
), (
    'sacred-heart-balby',
    'Sacred Heart Balby',
    false,
    true,
    'Sacred Heart Catholic Church',
    44,
    'Warmsworth Road',
    'Balby',
    'Doncaster',
    'DN4 0RR'
);

INSERT INTO Contact (
    code,
    short_name,
    full_name,
    landline,
    mobile,
    email,
    address
) VALUES (
    'father-basil',
    'Father Basil',
    'The Reverend Father Basil Nlebedim',
    '01302578824',
    '07485609642',
    'stmmmaltby@gmail.com',
    'st-mary-magdalene'
), (
    'tom-hosker',
    'Tom',
    'Thomas Hosker',
    '01302751132',
    '07312121996',
    'tomdothosker@gmail.com',
    null
);

INSERT INTO ServiceTime (
    id,
    weekday,
    day,
    month,
    year,
    hours,
    minutes,
    location,
    service_type,
    has_childrens_liturgy,
    childrens_liturgy_remarks,
    remarks
) VALUES (
    1,
    0,
    null,
    null,
    null,
    11,
    0,
    'st-mary-magdalene',
    'Mass',
    false,
    null,
    null
);

INSERT INTO ParishRole (
    code,
    description,
    contact
) VALUES (
    'parish-priest',
    'Parish Priest',
    'father-basil'
), (
    'computer-guy',
    'Computer Guy',
    'tom-hosker'
);

INSERT INTO Newsletter (
    id,
    week_beginning_day,
    week_beginning_month,
    week_beginning_year,
    link
) VALUES (
    1,
    1,
    1,
    2025,
    'https://www.youtube.com/watch?v=4jjzu1Z2RZc'
);