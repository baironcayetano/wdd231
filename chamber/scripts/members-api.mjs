const url = './data/members.json'

export async function getMembers(){
    try {
       const response = await fetch(url);
       if(!response.ok){
         throw Error(await response.text());
       } 
       const data = await response.json();
       return data.companies;
    } catch (error) {
        console.log(error);
    }
}


export async function getThreeRandomMembers(){
    let members = await getMembers();
    let goldAndSilverMembers = members.filter(member => member.membership_level > 1);
    let maxIndex = goldAndSilverMembers.length - 1;
    let randomIndexes = new Set();
    while (randomIndexes.size < 3){
        randomIndexes.add(Math.floor(Math.random()*maxIndex))
    }
    let randomMembers = [];
    randomIndexes.forEach(memberIndex => randomMembers.push(members[memberIndex]));
    return randomMembers;
}

