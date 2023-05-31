# Important
   - How to display a image selected from input type = file in reactJS
   ref : https://stackoverflow.com/questions/43992427/how-to-display-a-image-selected-from-input-type-file-in-reactjs


# How to try catch 
    const getList = async  (req,res) => {
    try{
        db.beginTransaction()
        var x = [1,2,3]
        // var y = x[10][0]
        const list1 = await db.query("SELECT * FROM customers");
        var d =  [{"key":"VGA","value":"12GH"}]
        d = JSON.stringify([{"key":"VGA","value":"12GH"}])
        const list2 = await db.query('INSERT INTO `tbl_json` (description) VALUES (?)',[d] )
        const list3 = await db.query("SELECT * FROM customers");
        res.json({
            controller : req.options,
            controller1 : req.controller,
            list3:list3,
            list1 : list1,
            list2 : list2
        })
        await db.commit()
    }catch(e){
        await db.rollback()
        // fs.mkdirSyn('error/customer', { recursive: true }, (err) => {
        //     // if (err) throw err;
        //     fs.writeFileSync("error/customer/getlist.txt","\n"+e.message,{flag:'a+'})
        // })
        res.status(500).send({
            message: 'This is an error!',
            error : e.message
        });
    }

}

# Upload file nodejs
    ref : https://codebysamgan.com/file-upload-in-node-js-using-multer


    <label
            style={{
                display:'inline-block',
                backgroundColor:'#eee',
                cursor:'pointer',
                height:80,
                width:80,
                position:'relative',
                borderRadius:10
            }}
            for="upload"
        >
            <div style={{
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:"translate(-50%,-50%)"
            }}>Image</div>
            <input onChange={onChnageFile} multiple={true}  style={{display:'none'}} type="file" id="upload" />
        </label>

        {image && image.length > 0 && <div>
            {image.map((item,index)=>(
                <Image
                    key={index} 
                    src={(item)} 
                    alt="image"
                    style={{
                        height:80,
                        width:80,
                        objectFit:'contain'
                    }}
                    
                />
            ))}
        </div>}




# configure react route
    > npm install react-route-dom
    - in App.js

    import HomePage  from "./page/home/HomePage"
    import CustomerPage from "./page/customer/CustomerPage"
    import {BrowserRouter,Routes,Route} from "react-router-dom"
    function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/customer' element={<CustomerPage/>} />
            </Routes>
        </BrowserRouter>
    )
    }
    export default App;


    HomePage.js
        const HomePage = () => {
            return (
                <div className="home_page">
                    <h1>HomePage</h1>
                </div>
            )
        }
        export default HomePage 
# Install moment 

    > npm install moment

