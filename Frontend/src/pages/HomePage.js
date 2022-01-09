import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => (
  <div>
    <section>
      <div className="py-5 d-flex justify-content-center">
        <div className="card container text-center py-5 mt-7">
          <h1><b><strong><em>Welcome</em></strong></b></h1>
          <hr/>
          <p>To the question and answer app.</p>
          <Link to="/questions" className="button btn-warning">
            View Questions
          </Link>
        </div>
      </div>
    </section>
  </div>
)
export default HomePage
