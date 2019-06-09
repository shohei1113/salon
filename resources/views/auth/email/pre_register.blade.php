<!DOCTYPE html>
<html lang="ja">
    <head>
        <link rel="stylesheet" href="{{{asset('/css/mail.css')}}}">
    </head>
    <body>
    サイトへのアカウント仮登録が完了しました。<br>
    <br>
    以下のURLからログインして、本登録を完了させてください。<br>
    {{url('http://stg.hayaokuri.com/register?token='.$user->email_verify_token)}}
    </body>
</html>