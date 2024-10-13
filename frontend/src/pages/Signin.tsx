import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"


export const Signin = () => {
  return (
    <div>
      <div className="flex">
        
          <div className="w-1/2">
              <Auth type="Sign In"/>
          </div>
          
          <div className="w-1/2 ">
            <Quote/>
          </div>
      </div>
    </div>
  )
}
