import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../components/Sidebar/contexts/SidebarDrawerContext'
import { createServer, Response } from 'miragejs';

createServer({
  seeds(server) {
    server.db.loadData({
      users: [{
        id: 'id1',
        first_name: 'John',
        surname: 'Daew',
        email: 'jon@gmail.com',
        password: '1234',
      }],
      tokens: [{
        token: 'a123124aadsa',
        userId: 'userId1',
      }],
      rounds: [{
        id: 'round1',
        tick: 1,
      }],
      planets: [{
        id: '11',
        commander: 'Filipetu',
        name: 'Nabucodonossor',
        breed_name: 'Amnis',
        user_id: '',
        round_id: '',
      }],
    })
  },

  routes() {
    this.namespace = 'api';

    this.post('/users/signin', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      const user = schema.db.users.where({ email: attrs.email })[0]
      console.log(attrs, user)
      if (user) {
        if (user.password === attrs.password) {
          return schema.db.tokens.where({ userId: user.id })[0]
        }
        return { reason: "Wrong password." }
      }
      return { reason: "User not found." }
    })

    this.post('/users', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      attrs.id = "21"
      schema.db.users.insert(attrs)
      return { id: attrs.id }
    })

    this.get('/rounds/current', (schema, request) => {
      return schema.db.rounds.find("round1")
    })

    this.get('/rounds/current/planet', (schema, request) => {
      return schema.db.planets.find("11")
    })

    this.get('/users/me', (schema, request) => {
      return schema.db.users.find("id1")
    })


    this.passthrough((request) => {
      if (
        request.url === "/_next/static/development/_devPagesManifest.json"
      ) {
        return true;
      }
    });
  }
})



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>

    </ChakraProvider>
  )
}

export default MyApp
