import {InMemorySigner} from "@taquito/signer";
import {generateMnemonic, mnemonicToSeed} from "bip39";
import {b58cencode, prefix} from "@taquito/utils";

main().then(()=>{
    process.exit(0)
}).catch(err=>{
    console.log(err)
    process.exit(1)
})

async function main(){
    const strength = 192 // Should be equal to 18 words
    const mnemonic = generateMnemonic(strength)
    if(mnemonic.split(" ").length !== 18) throw Error(`Invalid strength : ${strength}`)
    const seed = await mnemonicToSeed(mnemonic)
    const sk = b58cencode(seed.subarray(0, 32), prefix.edsk2);
    const signer = await InMemorySigner.fromSecretKey(sk)
    const pk = await signer.publicKey()
    const pkh = await signer.publicKeyHash()
    console.log({mnemonic, sk, pk, pkh})
}