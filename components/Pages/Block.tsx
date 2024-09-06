export const Block = props=>{

    if(!props.state.cart)
    {
        props.state.cart=[]
    }

    let size = props.state.cart.includes(props.book.title)?20:25
    let book = props.book

    return <c-c style={{backgroundColor:"white",width:170,margin:5,borderRadius:5,boxShadow:"0px 0px 9px 2px rgba(0,0,0,0.43)",marginTop:10}}>
        <img src={book.imageLink} style={{height:200,width:"100%",borderTopLeftRadius:5,borderTopRightRadius:5}}
     className={global.styles.hover} 
     onClick={()=>{
      props.state.book=book
      props.state.form = "bookspecs"
      props.refresh()
     }}/>

    <f-cc style={{width:160,direction:"ltr",height:20,paddingTop:20,paddingBottom:20}}>
        <f-14>{props.book.title}</f-14>
    </f-cc>

    <hr style={{width:"80%",opacity:0.2}} />

    <f-csb style={{width:"100%"}}>
    <f-15 style={{padding:"0px 10px"}}>
         <img src={props.state.cart.includes(props.book.title)?
         "https://cdn.ituring.ir/qepal/ok.svg":
         "https://cdn.ituring.ir/qepal/cart.svg"}
          style={{width:size,height:size}} /></f-15>

        <c-c style={{padding:"5px 10px",direction:"ltr"}}>
            
        <f-12><del  style={{fontWeight:"bolder"}}>{(props.book.price as number).toLocaleString("fa-IR")}تومان </del></f-12>
        <f-13  style={{fontWeight:"bolder"}}>{(props.book.price * 0.8 as number).toLocaleString("fa-IR")}تومان </f-13>
        </c-c>
    </f-csb>
     </c-c>
  }
  