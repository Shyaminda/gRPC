import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './generated/a';
import { AddressBookServiceHandlers } from './generated/AddressBookService';
import { Status } from '@grpc/grpc-js/build/src/constants';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));

const personProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

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

const handler: AddressBookServiceHandlers =  {
    AddPerson: (call, callback) => {
        let person = {
        name: call.request.name,
        age: call.request.age
        }
        PERSONS.push(person);
        callback(null, person)
    },
    GetPersonByName: (call, callback) => {
        let person = PERSONS.find(x => x.name === call.request.name);
        if (person) {
        callback(null, person)
        } else {
        callback({
            code: Status.NOT_FOUND,
            details: "not found"
        }, null);
        }
    }
}

//const app = express();
const server = new grpc.Server();

server.addService((personProto.AddressBookService).service, handler);
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});