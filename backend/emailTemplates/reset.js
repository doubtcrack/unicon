const resetTemplateEmail = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Activation</title>
    <style>
        /* Reset CSS */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #333;
        }

        /* Content */
        .content {
            margin-bottom: 30px;
        }

        .content p {
            line-height: 1.6;
            color: #666;
        }

        /* Button */
        .button {
            display: inline-block;
            padding: 5px 10px;
            background-color: purple;
      		border: 1px solid purple;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
      .button:hover{
      color:skyblue}
      
      .link {
      font-size: 12px;
      }

        /* Footer */
        .footer {
            text-align: center;
            color: #999;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Reset Password</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <p>Hello {{name}},</p>
            <p>We found a request for resetting the password. To reset your password, please click the button below:</p>
            <p><a href={{email_link}}" class="button">Reset Password</a></p>
              <p>If the above button is not working, copy the below given link and open in the browser:<br/><a href={{email_link}}" class="link">{{email_link}}
              </a></p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>If you did not sign up for this account, you can safely ignore this email.</p>
            <p>&copy; unicon team.</p>
        </div>
    </div>
</body>

</html>
`;

module.exports = resetTemplateEmail;
