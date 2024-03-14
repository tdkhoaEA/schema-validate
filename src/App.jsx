import Header from './components/Header';
import Welcome from './components/Welcome';
import Code from './components/Code';
import Data from './components/Data';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
    const [schema, setSchema] = useState('');
    return (
        <>
            <Header />
            <Welcome />
            <div className="bg-white pt-4 sm:pt-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">
                            Schema validator
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Validate with Schema Draft 2020-12
                        </p>
                    </div>
                </div>
                <Code updateSchema={(val) => setSchema(val)} />
            </div>
            <div className="bg-white sm:pt-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">
                            Data validator
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Validate with Schema Draft 2020-12
                        </p>
                        {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                            Quis tellus eget adipiscing convallis sit sit eget
                            aliquet quis. Suspendisse eget egestas a elementum
                            pulvinar et feugiat blandit at. In mi viverra elit
                            nunc.
                        </p> */}
                    </div>
                </div>
                <Data schema={schema} />
            </div>
            <Footer />
        </>
    );
}

export default App;
