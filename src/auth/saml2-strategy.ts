import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-saml';
import * as fs from 'fs';


@Injectable()
export class Saml2Strategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super({
      entryPoint: 'https://projets-web.onelogin.com/trust/saml2/http-post/sso/f8feeead-efec-4eda-84a1-a5ca5c8ac5ab',
      issuer:'https://app.onelogin.com/saml/metadata/f8feeead-efec-4eda-84a1-a5ca5c8ac5ab',
      callbackUrl: 'http://localhost:3000/auth/callabck',
      cert: fs.readFileSync('src/onelogin.pem', 'utf-8')
    })
  }

  validate (profile, done): any {
    console.log('profile in strategy', profile);
    return done(null, {
      id: profile.nameID,
      email:
        profile[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      displayName:
        profile['http://schemas.microsoft.com/identity/claims/displayname'],
      firstName:
        profile[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
        ],
      lastName:
        profile[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
        ],
    }); 

  }
}
