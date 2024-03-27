from django.core.mail import send_mail
from django.conf import settings

templates=[
    {
        'subject': 'Payment Details for Hostel Stay',
        'message': '''Dear Guest,

Thank you for choosing our hostel for your stay. We would like to provide you with the payment details.

Amount to be paid:
- Refundable Security Deposit: $100
- Stay Amount: $200

Please make the payment to the following bank account:

Bank Name: XYZ Bank
Account Number: 1234567890
Account Holder: Hostel Management

Once the payment is made, please send us the transaction details for verification.

If you have any questions or need further assistance, please feel free to contact us.

Best regards,
Hostel Management'''
    },
    
]

def send(template, recipients):
	send_mail(
    		subject=template['subject'],
    		message=template['message'],
    		from_email=settings.EMAIL_HOST_USER,
    		recipient_list=recipients)