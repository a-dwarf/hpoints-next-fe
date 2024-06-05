export const BasicInfo = () => {
  return <div>
    <div>
      <div>Title</div>
      <div>
        <input  className="input input-bordered" />
      </div>
    </div>
    <div>
      <div>Description</div>
      <div>
        <textarea  className=" textarea textarea-bordered" />
      </div>
    </div>
    <div>
      <div>Register Period</div>
      <div>
        <input type="date"  className=" textarea textarea-bordered" />
      </div>
    </div>
    <div>
      <div>Set a Banner</div>
      <div>
        <input type="file"  className=" textarea textarea-bordered" />
      </div>
    </div>
    <div>
      <div>Select Chain</div>
      <div>
        <input  className=" input input-bordered" />
      </div>
    </div>
  </div>
}

export default BasicInfo;