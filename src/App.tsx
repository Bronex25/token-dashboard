import './App.css'
import { Button } from './components/ui/button'
import { NavigationMenu } from './components/ui/navigation-menu'

function App() {
  return (
    <>
     <NavigationMenu>
      <Button variant={'outline'}>click me</Button>
     </NavigationMenu>
    </>
  )
}

export default App
