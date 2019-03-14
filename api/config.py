import os

# development config
DEBUG = True
IMAGES_DIR = "./images"
HOST_URL = "http://localhost:5000"
POSTGRES_DATABASE_HOST = os.environ.get(
    "POSTGRES_DATABASE_HOST", "carseatjungle.cvps0v8aayng.us-east-2.rds.amazonaws.com")
POSTGRES_DATABASE_USER = os.environ.get("POSTGRES_USER", "carseatjungle")
POSTGRES_DATABASE_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "csj957dvkn3")
POSTGRES_DATABASE_DB = os.environ.get("POSTGRES_DATABASE", "carseatjungle")
MAIL_SERVER = os.environ.get("MAIL_SERVER", "sub4.mail.dreamhost.com")
MAIL_PORT = os.environ.get("MAIL_PORT", 465)
MAIL_USE_SSL = os.environ.get("MAIL_USE_SSL", True)
MAIL_USERNAME = os.environ.get("MAIL_USERNAME", "test@initgrupa.hr")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD", "blabla33")
S3_BUCKET = os.environ.get("S3_BUCKET_NAME", "init-carseatjungle-static")
S3_KEY = os.environ.get("S3_ACCESS_KEY", "AKIAIBRAZIB3ULUW3TSA")
S3_SECRET = os.environ.get(
    "S3_SECRET", "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")
S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)
