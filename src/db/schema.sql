CREATE TYPE role_type AS ENUM ('Dosen', 'Tim SPSS');
CREATE TYPE status_type AS ENUM ('waiting', 'in review', 'success');
CREATE TYPE notif_type AS ENUM ('success', 'error', 'info');

CREATE TABLE users ( 
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    role role_type,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents ( 
    document_id SERIAL PRIMARY KEY, 
    lecturer_id INTEGER NOT NULL, 
    file_path VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL,
    status status_type DEFAULT 'waiting',
    FOREIGN KEY (lecturer_id) REFERENCES users(user_id)
);

CREATE TABLE ratings ( 
    rating_id SERIAL PRIMARY KEY, 
    document_id INTEGER NOT NULL, 
    assessing_lecturer_id INTEGER NOT NULL,
    score INTEGER NOT NULL, 
    content JSON NULL, 
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(document_id),
    FOREIGN KEY (assessing_lecturer_id) REFERENCES users(user_id)
);

CREATE TABLE notifications ( 
    notification_id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    type notif_type, 
    payload JSON NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_preferences ( 
    user_id INTEGER PRIMARY KEY, 
    is_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE metadata ( 
    metadata_id SERIAL PRIMARY KEY, 
    document_id INTEGER NOT NULL,
    payload JSON NULL, 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(document_id)
);

ALTER DATABASE db SET timezone TO 'Asia/Jakarta';