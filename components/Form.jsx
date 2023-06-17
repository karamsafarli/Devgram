import Link from "next/link";
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const darkmode = useSelector((state) => state.colorThemeReducer.value);

  return (
    <section className='make_post'>
      <h1 className="header">{type} Post</h1>

      <form onSubmit={handleSubmit}>
        <label>Your Post Header</label>
        <textarea
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
          placeholder='Write your text here...'
          required
        />


        <label>Tags <span>(#dev, #frontend, #backend...)</span></label>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          style={{ backgroundColor: darkmode ? '#1D2226' : 'white' }}
          placeholder='tag1 tag2 ...'
          required
        />

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPost({ ...post, imageURL: base64 })}
        />

        <div className="form_btns">
          <Link href='/'>Cancel</Link>
          <button
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>


      </form>
    </section>
  )
}

export default Form