## NEXT js Simple Email Subscription and Email Verification

- used `nodemailer` package for sending emails
- added Email subscription models, controller & service
- encoded email verification token via nextjs jwt encoder

### Pre requirements
1. fill in your database conn details in `src/database/config.js`
2. run `npx sequelize-cli db:migrate`

### Run
1. run `npm install`
2. run `npm run start:dev`