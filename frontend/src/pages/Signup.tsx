import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"


export const Signup = () => {
  return (
    <div>
      <div className="flex">
        
          <div className="w-1/2">
              <Auth type="Sign Up"/>
          </div>
          <div className="w-1/2 ">
            <Quote/>
          </div>
          
      </div>
    </div>
  )
}
