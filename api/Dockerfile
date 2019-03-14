FROM python:3.6-slim

## make a local directory
RUN mkdir /app

# set "app" as the working directory from which CMD, RUN, ADD references
WORKDIR /app

# copy requirements.txt to /app
ADD requirements.txt .

# pip install the local requirements.txt
RUN pip install -r requirements.txt

# now copy all the files in this directory to /code
ADD . .

# Listen to port 80 at runtime
EXPOSE 5000

# Define our command to be run when launching the container
CMD ["gunicorn", "main:app", "-b", "0.0.0.0:5000", "--workers", "4", "--reload", "--capture-output", "--enable-stdio-inheritance", "--log-level", "DEBUG"]