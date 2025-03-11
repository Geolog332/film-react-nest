CREATE TABLE films (
    id UUID PRIMARY KEY,
    title VARCHAR NOT NULL,
    director VARCHAR,
    description TEXT,
    rating FLOAT,
    tags TEXT[],
    about TEXT,
    image VARCHAR,
    cover VARCHAR
);

CREATE TABLE schedules (
    id UUID PRIMARY KEY,
    film_id UUID REFERENCES films(id) ON DELETE CASCADE,
    daytime TIMESTAMP NOT NULL,
    hall INT NOT NULL,
    rows INT NOT NULL,
    seats INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    taken TEXT[] DEFAULT '{}'
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    tickets JSONB NOT NULL 
);