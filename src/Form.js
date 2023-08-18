import React from "react";
const Form = (props) => {
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 mt-5">
            <form className="form" id="buildVast" onSubmit={props.SubmitData}>
              {/* Client Name */}
              <div className="mb-3">
                <label htmlFor="cnInput" className="form-label">
                  Client Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cnInput"
                  name="clientName"
                  aria-describedby="clientNameHelp"
                  required
                  onChange={(e) => props.setClientName(e.target.value)}
                />
                <div id="clientNameHelp" className="form-text">
                  File will be generated by this name.
                </div>
              </div>

              {/* desc url */}
              <div className="mb-3">
                <label htmlFor="exampleInputcn" className="form-label">
                  Client Website Url :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputcn"
                  name="descUrl"
                  aria-describedby="descUrlHelp"
                  required
                  pattern="https?://.+"
                  title="Include https://"
                  onChange={(e) => props.setDescUrl(e.target.value)}
                />
                <div id="descUrlHelp" className="form-text">
                  Enter a Valid Url, this will be used as
                  <b> description url </b> in ad Tags.
                </div>
              </div>

              {/* Ad tags */}

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControladTag1"
                  className="form-label"
                >
                  Ad Tags
                </label>

               <div>
               <input type="checkbox" value= {props.isChecked} id="extension" 
                 onChange={(e) => props.setIsChecked(e.target.value)}
                 ref={props.checkbox}
               /> Enable Extension 
               </div>

                <textarea
                  className="form-control"
                  id="exampleFormControladTag1"
                  name="adTags"
                  required
                  rows="7"
                  onChange={(e) => props.setAdTags(e.target.value)}
                ></textarea>
              </div>

              <button id="genVast" className="btn btn-success" type="submit">
                Generate & Download Vast Xml
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
