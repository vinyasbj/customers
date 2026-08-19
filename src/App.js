import logo from './logo.svg';
import React from 'react'
import './App.css';

function encode(data) {
    console.log('[encode] Called with data:', data);
    debugger;
    const formData = new FormData()

    for (const key of Object.keys(data)) {
        console.log(`[encode] Appending key="${key}", value=`, data[key]);
        formData.append(key, data[key])
    }

    console.log('[encode] Returning FormData');
    return formData
}

function App() {
    const [state,
        setState] = React.useState({})

    const handleChange = (e) => {
        console.log('[handleChange] Field changed:', e.target.name, '=', e.target.value);
        debugger;
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleAttachment = (e) => {
        console.log('[handleAttachment] File selected:', e.target.files[0]?.name);
        debugger;
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('[handleSubmit] Form submitted, current state:', state);
        debugger;
        const form = e.target
        fetch('/', {
            method: 'POST',
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state
            })
        }).then(() => {
            console.log('[handleSubmit] Submission successful, redirecting');
            window.location.assign('/contact-thanks/');
        }).catch((error) => {
            console.error('[handleSubmit] Submission failed:', error);
            alert(error);
        })
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
