import React, { useState } from 'react';

import Head from 'next/head';
import Script from 'next/script';

function Page( {data} ) {
    const [mensagem, setMensagem] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const onChangeInput = e => setMensagem({ ...mensagem, [e.target.name]: e.target.value})

    const sendMessage = async e => {
        e.preventDefault();
        
        setResponse({formSave: true})

        try{
            const res = await fetch('http://localhost:8080/cadastrar-mensagem', {
                method: 'POST',
                body: JSON.stringify(mensagem),
                headers: { 'Content-Type': 'application/json'}
            });
            const responseEnv = await res.json();
            if(responseEnv.erro){
                setResponse({ 
                    formSave: false,
                    type: 'error',
                    mensagem: responseEnv.mensagem
                })
            }else{
                setResponse({ 
                    formSave: false,
                    type: 'sucess',
                    mensagem: responseEnv.mensagem
                })
                
            }
        }catch(err){
            setResponse({ 
                formSave: false,
                type: 'error',
                mensagem: 'erro: contato não efetuado com sucesso'
            })
        }
    }


  return (
    <div>
      <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <title>trabalho react</title>
      </Head>
      {console.log(data)}
      <nav className="navbar">
            <div className="max-width">
                <ul className="menu">
                    <li><a href="#top" className="menu-btn">Home</a></li>
                    <li><a href="#produtos" className="menu-btn">Produtos</a></li>
                    <li><a href="#contact" className="menu-btn">Contato</a></li>
                </ul>
                <div className="menu-btn">
                  <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>

        <section className="top" id="top">
            <div className="max-width">
                <div className="top-content">
                    <div className="text-1">{data.datahome.title_top_one}</div>
                    <div className="text-2">{data.datahome.title_top_two}</div>
                    <div className="text-3">{data.datahome.title_top_three}</div>
                    <a href="#produtos">{data.datahome.btn_title_top}</a>
                </div>
            </div>
        </section>

        <section className="produtos" id="produtos">
            <div className="max-width">
                <h2 className="title">{data.datahome.ser_title}</h2>
                <div className="serv-content">
                    <div className="card">
                        <div className="box">
                            <i className={data.datahome.ser_icon_one}></i>
                            <div className="text">
                            {data.datahome.ser_title_one}
                            </div>
                            <p>{data.datahome.ser_desc_one}<br/></p>
                            
                           
                        </div>
                    </div>

                    <div className="card">
                        <div className="box">
                            <i className={data.datahome.ser_icon_two}></i>
                            <div className="text">
                            {data.datahome.ser_title_two}
                            </div>
                            <p>{data.datahome.ser_desc_two}<br/></p>
                            
                           
                        </div>
                    </div>

                    <div className="card">
                        <div className="box">
                            <i className={data.datahome.ser_icon_three}></i>
                            <div className="text">
                            {data.datahome.ser_title_three}
                            </div>
                            <p>{data.datahome.ser_desc_three}<br/></p>
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="contact" id="contact">
            <div className="max-width">
                <h2 className="title">{data.datahome.cont_title}</h2>
                <div className="contact-content">
                    <div className="column left">
                        <p>{data.datahome.cont_desc}</p>
                        <div className="icons">
                            <div className="row">
                                <i className={data.datahome.cont_icon_emp}></i>
                                <div className="info">
                                    <div className="head">{data.datahome.cont_title_emp}</div>
                                    <div className="sub-title">{data.datahome.cont_name_emp}</div>
                                </div>
                            </div>

                            <div className="row">
                                <i className={data.datahome.cont_icon_end}></i>
                                <div className="info">
                                    <div className="head">{data.datahome.cont_title_end}</div>
                                    <div className="sub-title">A{data.datahome.cont_name_end}</div>
                                </div>
                            </div>

                            <div className="row">
                                <i className={data.datahome.cont_icon_email}></i>
                                <div className="info">
                                    <div className="head">{data.datahome.cont_title_email}</div>
                                    <div className="sub-title">{data.datahome.cont_name_email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column right">
                        <div className="text">{data.datahome.cont_title_form}</div>

                        {response.type === 'error'? <p className='alert-danger'> {response.mensagem}</p> :""}
                        {response.type === 'sucess'? <p className='alert-sucess'>{response.mensagem} </p>:""}



                        <form onSubmit={sendMessage}>
                            <div className="fields">
                                <div className="field name">
                                    <input type="text" name='name' placeholder="Digite o nome" onChange={onChangeInput} required/>
                                </div>
                                <div className="field email">
                                    <input type="email" mame='email' placeholder="Digite o e-mail" onChange={onChangeInput} required/>
                                </div>
                            </div>

                            <div className="field">
                                <input type="text" name = 'subject' placeholder="Digite o assunto" onChange={onChangeInput} required/>
                            </div>

                            <div className="field textarea">
                                <textarea name = 'content' cols="30" rows="10"  placeholder="Digite o conteúdo" onChange={onChangeInput} required></textarea>
                            </div>

                            <div className="button-area">
                                {response.formSave ? <button type="submit" disabled>Enviando</button>: <button type="submit">Enviar</button>}
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        


    <Script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js' strategy='beforeInteractive'/>
    <Script src='custom.js' strategy='afterInteractive'/>

    </div>
  );
}

export async function getServerSideProps(){
    const response =  await fetch(`http://localhost:8080`);
    const data = await response.json();
    //console.log(data);
    return { props: {data} }
}

export default Page;