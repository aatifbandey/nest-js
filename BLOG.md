https://www.youtube.com/watch?v=GHTA143_b-s&t=1688s
set up nest js
create module using next g module <moduleName>

for db we will use docker

create docker compose file

install prisma and prisma/client

Run prisma usig 
npx prisma init

It will going to generate several files .env and prisma folder
you can also .env file inside prisma folder

lets create models

we will create two models

Now lets run the prisma command

npx prisma help


we have plenty of commands here

but we will currently use migrate command

npx prisma migrate dev

It will just add tables for user and bookmark
and will ask few questions like migration name etc

After running teh comman we will se it will generate a migrations folder

And if you check the changes it just genarated a basic sql file to create tables

when we run migrate dev it also run generate command where it creates types for user and bookmark

Lets run the prisma studio 
npx prisma studio

I hope you will see such screen in your browser

Now lets create a module to acess db from our exisiting modules

nest g module prisma

We will also create service, above we above we created service manually lets create using command

nest g service prisma --no-spec // by default it will create a spec file

Now in the service we will write our logic to connect to database

We will change a little  bit of service code we will extend Prismaservice with prismaclient

//prima client allows us to connect/disconnect, excute operations to database

Also to initiate db connection we will make some changes in super()

So we now have prisma module ready, lets say we want to auth module to access prisma module
you can easily do it via imports
imports: [PrismaModule]

So now our auth service can also access prisma service

We will make some change in AuthService

But if you notice your terminal you will see some error like

` Nest can't resolve dependencies of the AuthService (? ). Please make sure that the argument PrismaService at index [0] is available in the AuthModule context.`

It means we need to export prisma service we will make a small in prisma.module.ts


But this soln doesnt look scalabale we also have bookmark, user which want to access database 
should we keep importing prisma module everywhwre 
lets check that


we can create prisma a global module

so by adding @Global on the prisma module it will be accessible to all modules
// note jsut  make sure you Prisma module is added in app.module

Now lets do some real action, write business logic
for sign up and signIn

The sign up will accept some data in the request body,

To handle request body Nest js use dto (data transfer object), in nutshell its just a object that pushes data from request
You can run validations on this dto and also can define shape of dto like it must have 
email and password

Lets check the changes in AuthController



Still there is a validation left like what if user didnt pass email or not valid email or passwrd etc

TO handle such scenarios we can use pipesfrom NestJs but 
Pipes are just functions that transform data.

We will install class validator and class transformer packages

to apply validation we need to convert AuthDto interface to class and add validations
like isNotEmpty IsEmail etc

also wee need to tell Nest Js to use pipes logic for validations globally

we will update main.ts to use validationPipe from nestjs

Now we need to encrypt the  password



To load the env file we need config module from nestjs/config

To protect routes like users/me etc we will use Guard from nest-js
the guard will be called in the controllers 
The UserGaurd will use some strategy like jwt as provided by us 

// code example of UserController


now u can see if you hit /users/me it says 401 unauthorized

Lets create a resusable guard for all our routes to follow strategy
and move the Guard on top of user controller rather than for each route

create a folder called gaurd under auth folder

Lets create a custom decorator, create a folder called decorator under auth
and use the same in User controller.ts


Configure HTTP Status code via http decorator 

// End to end testing

For end to end testing we will use pactum js