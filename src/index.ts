import path from 'path';
import * as grpc from '@grpc/grpc-js';
import  { ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));

const personProto = grpc.loadPackageDefinition(packageDefinition);

//in memory database
const PERSONS: any[] = [
    {
        name: "shyaminda",
        age: 45
    },
    {
        name: "williams",
        age: 45
    },
];

//@ts-ignore
//call => req
//callback => res
function addPerson(call, callback) {
    console.log(call)
    let person = {
        name: call.request.name,
        age: call.request.age
    }
    PERSONS.push(person);
    callback(null, person) //return null for error and person for success
}

//const app = express();
const server = new grpc.Server();

//to solve ts error "as ServiceClientConstructor"
server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { AddPerson: addPerson});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});