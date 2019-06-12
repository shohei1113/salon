<form method="post" action="/api/user/1" enctype="multipart/form-data">
    {{ csrf_field() }}

    <fieldset>
        <p>
            <input type="hidden" name='_method' value='put' />
            <input id="file" type="file" name="image" />
            <input type="hidden" name="file_name" value="file1" />

            @if ($errors->has('image'))
                {{ $errors->first('image') }}
            @endif
        </p>
    </fieldset>

    <input class="btn btn-primary" type="submit" value="アップロード" />
</form>