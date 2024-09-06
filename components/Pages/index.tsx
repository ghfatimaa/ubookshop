import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  getProps(async()=>{
    let cart = localStorage.getItem("cart")
    if(cart)
    {
      state.cart = JSON.parse(cart)
    }
  })

  let styles = global.styles
  let name = "خوش آمدید"
  let total_price = 0

  if(!state.cart)
  {
    state.cart=[]
  }

  for(let title of state.cart)
  {
    let book = props.books.find(b => b.title == title)
    if(book)
    {
      total_price += (book.price * 0.8)
    }
  }
 
  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      {state.form == "bookspecs"?<WindowFloat title='مشخصات کتاب'
      onclose={()=>{
       delete state.form
       refresh()
      }}>
      
      <f-x>
        <f-14> نام کتاب: {state.book.title}</f-14>
      </f-x>

      <f-x>
        <f-14> نویسنده: {state.book.author}</f-14>
      </f-x>
       
      <f-x>
        <f-14> زبان: {state.book.language}</f-14>
      </f-x>
       
      <f-x>
        <f-14> کشور: {state.book.country}</f-14>
      </f-x>
       
      <f-x>
        <f-14>تعداد صفحات: {state.book.pages.toLocaleString("fa-IR")}</f-14>
      </f-x>

      <g-b style={{backgroundColor:
      state.cart.includes(state.book.title)?"#d8a7a7": "#9dc3b0"}}
     
      onClick={()=>{
        if(state.cart.includes(state.book.title))
        {
          state.cart = state.cart.filter(bookname => state.book.title != bookname)
          localStorage.setItem("cart" , JSON.stringify(state.cart))
          state.form = null
          refresh()
        }
        else
        {
          state.cart.push(state.book.title)
          localStorage.setItem("cart" , JSON.stringify(state.cart))
          state.form = null
          refresh()
        }
       
      }}>
        {state.cart.includes(state.book.title)?<f-14>حذف از سبد  خرید</f-14>:<f-14>افزودن به سبد  خرید</f-14>}
      </g-b>
       
      </WindowFloat>:null}

      <Window title='سبد خرید' style={{ minHeight: 100, margin: 10, width: "calc(100% - 20px)"}}>

       <sp-1/>
       <sp-1/>
       <f-cse style={{marginTop:10}}>
        <f-14>مجموع قابل پرداخت : {total_price.toLocaleString("fa-IR")}تومان</f-14>
        <f-14>تعداد کتاب ها : {state.cart.length.toLocaleString("fa-IR")}عدد</f-14>
       </f-cse>

</Window>
    <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)"}}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props.books, null, 2)}</pre> */}
        <w-cse>
          {props.books.map(book =>{
           return <Block
           book={book}
           state={state}
           refresh={refresh}/>
          })}
        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
    let books = await global.db.collection("books").find({}).toArray()
    for(let book of books)
    {
      book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
    }
    console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}