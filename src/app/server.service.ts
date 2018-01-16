import {Injectable} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/Rx';
import { Observable  } from "rxjs/Observable";



@Injectable()
export class ServerService{
    constructor(private http:Http){}
    storeServers(servers:any[]){
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('https://udemy-http-902f8.firebaseio.com/data.json',
        servers,
        {headers:headers});

        // const headers = new Headers({'Content-Type':'application/json'});
        // return this.http.post('https://udemy-http-902f8.firebaseio.com/data.json',
        // servers,
        // {headers:headers});
    }
    getServers(){
       // return this.http.get('https://udemy-http-902f8.firebaseio.com/data')
       return this.http.get('https://udemy-http-902f8.firebaseio.com/data.json')
            .map(
                (response:Response) =>{
                    const data = response.json();
                    for(const server of data){
                        server.name = 'Fetched'+server.name ;
                    }
                    return data;
                }
            )
            .catch(
                (error:Response)=>{
                console.log(error);
                return Observable.throw( 'Something went wrong '+error);
            });
    }
        getAppName(){
            return this.http.get('https://udemy-http-902f8.firebaseio.com/appName.json')
            .map((response:Response)=>{
                return response.json();
        });

}