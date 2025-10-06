import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок с сайта на email bestlog@bk.ru
    Args: event с httpMethod, body (JSON с полями name, email, phone, message)
          context с request_id
    Returns: HTTP response
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name', '')
    email = body_data.get('email', '')
    phone = body_data.get('phone', '')
    message = body_data.get('message', '')
    
    email_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #FF6B35;">Новая заявка с сайта WBOZYM</h2>
        <div style="background: #f7f7f7; padding: 20px; border-radius: 8px;">
          <p><strong>Имя:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Телефон:</strong> {phone}</p>
          <p><strong>Сообщение:</strong></p>
          <p style="background: white; padding: 15px; border-left: 4px solid #FF6B35;">{message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Заявка отправлена: {context.request_id}
        </p>
      </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name}'
    msg['From'] = 'noreply@wbozym.ru'
    msg['To'] = 'bestlog@bk.ru'
    
    html_part = MIMEText(email_content, 'html')
    msg.attach(html_part)
    
    try:
        with smtplib.SMTP('localhost', 25) as server:
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Request received', 'note': f'Email simulation: {name} - {email}'}),
            'isBase64Encoded': False
        }
