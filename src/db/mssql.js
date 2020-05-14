const mssql = require( 'mssql' );

export default class MsSql {
    static _instance;
    constructor () {
        console.log('Clase MSSQL iniciada');
        const config = {
          authentication: {
            options: {
              userName: "scemarket", 
              password: "Pmic1234"
            },
            type: "default"
          },
          server: "scemarket.database.windows.net", 
          options: {
            database: "SCEMarket",
            encrypt: true,
            enableArithAbort: true,
            rowCollectionOnRequestCompletion:true,
            trustServerCertificate: true,
          }
        };

    var connection = new Connection(config);

    this.conn = new mssql.ConnectionPool(this.config);
    this.conectarBD();

    }

    static get instance(){
        return this._instance || (this._instance = new this());
    }

    conectarBD() {

        this.conn.connect();        
        this.conn.on('error', err => {
             console.error(err);
        });
    }

    static runInsert(insertSql){
        console.log('runInsert');
        const transaction = new mssql.Transaction(this._instance.conn);
        
        transaction.begin(  undefined,function (err)  {
            if(err){
                // ... error checks        
                console.log(err);
                return;
            }

            const request = new mssql.Request(transaction);          
            request.query(insertSql, (err, result) => {
                if(err){
                    // ... error checks        
                    console.log(err);
                    return;
                }            
                transaction.commit(err => {
                    if(err){
                        // ... error checks        
                        console.log(err);
                        return;
                    }        
                    console.log("Transaction committed.");
                });
            });
            
        });
        
    }
  
}