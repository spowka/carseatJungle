from flask import current_app
from flask_mail import Mail, Message
from .decorators import run_async

mail = Mail()

def init_mail(app):
    mail.init_app(app)
    return mail

@run_async
def send_mail_async(flask_app, msg):
    with flask_app.app_context():
        mail.send(msg)

def send_mail(sender, recipients, subject, body):    
    msg = Message(subject=subject,
                  sender=sender,
                  recipients=recipients)

    msg.html = body
    app = current_app._get_current_object()
    send_mail_async(app, msg)