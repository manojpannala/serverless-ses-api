exports.handler = async event => {

    const { to, from, subject, text } = JSON.parse (event.body);

    if ( !to || !from || !subject || !text ) {
        return _400 ({message: 'missing parameter on request body'});
    }

    const emailParams = {
        Destination: {
            ToAddress: [to]
        },
        Message: {
            Body:{
                Text: { Data: text}
            },
            
        }
    }

};

const _400 = (body) => {
    return {
        headers: {
            'Content-Type': 'application/json',    
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 400,
        body: JSON.stringify(body),
    };

};