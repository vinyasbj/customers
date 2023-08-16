import logo from './logo.svg';
import React from 'react'
import './App.css';

function encode(data) {
    const formData = new FormData()

    for (const key of Object.keys(data)) {
        formData.append(key, data[key])
    }

    return formData
}

function App() {
    const [state,
        setState] = React.useState({})

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleAttachment = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state
            })
        }).then(() => window.location.assign('/contact-thanks/')).catch((error) => alert(error))
    }

    return (
        <div>
            <h1>File Upload</h1>
            <form
                className="block text-sm font-semibold leading-6 text-gray-900"
                name="file-upload"
                method="post"
                action="/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}>
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="file-upload" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <p hidden>
                    <label>
                        Don’t fill this out:
                        <input name="bot-field" onChange={handleChange}/>
                    </label>
                </p>
                <p>
                    <label>
                        Your name:
                        <br/>
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>
                </p>
                <p>
                    <label>
                        File:
                        <br/>
                        <input type="file" name="attachment" onChange={handleAttachment}/>
                    </label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
                <p>Note: multiple file uploads are not supported by Netlify at this time.</p>
            </form>
        </div>
    );
}

export default App;
