<?php

return [
    'message' => [
        'auth' => [
            'register' => '本登録が完了しました。',
            'login' => 'ログインが完了しました。',
            'signup' => '仮登録が完了しました。',
            'logout' => 'ログアウトが完了しました。',
        ],
        'salon' => [
            'index' => 'サロン一覧取得',
            'store' => 'サロン情報登録',
            'show' => 'サロン詳細取得(会員)',
            'update' => 'サロン情報更新',
            'delete' => 'サロン情報削除',
            'preview' => 'サロン詳細取得(未会員)'
        ],
        'post' => [
            'index' => '投稿一覧取得',
            'store' => '投稿情報登録',
            'update' => '投稿情報更新',
            'delete' => '投稿情報削除',
        ],
        'category' => [
            'index' => 'カテゴリー一覧取得',
            'store' => 'カテゴリー情報登録',
            'update' => 'カテゴリー情報更新',
            'delete' => 'カテゴリー情報削除',
        ],
        'comment' => [
            'store' => 'コメント登録',
            'update' => 'コメント更新',
            'delete' => 'コメント削除',
        ],
        'user' => [
            'update' => 'ユーザー情報更新',
            'info' => 'ログインユーザー情報',
            'mypage' => 'マイページ情報取得',
            'send_change_email' => 'メールアドレス再設定用メール送信完了',
            'reset_email' => 'メールアドレス再設定完了',
        ],
        'payment' => [
            'payment_by_card' => 'クレジットカード決済完了しました。',
            'cancel_payment_by_card' => 'クレジットカード決済をキャンセルしました。'
        ]
    ],
    'email_title' => [
        'pre_register' => 'HAYAOKURI: 仮登録が完了しました',
        'email_reset' => 'HAYAOKURI: ご登録メールアドレス変更手続きのお知らせ',
    ]
];