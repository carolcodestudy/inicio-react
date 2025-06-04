import { Student } from './component/Student'
import { Footer } from './component/Footer'
import UserProvider from './context/user'

const App = ()=>{
return(
  <UserProvider>
    <div>
      <h1>Pasta sem contextApi</h1>
      <br />
      <hr />
      <Student/>

      <Footer/>
    </div>
  </UserProvider>
  )
}
export default App
