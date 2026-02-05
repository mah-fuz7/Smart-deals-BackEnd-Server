# post method have two option 
1.inserOne() 
2.insertMany()
# but the main problem is you need some time 1 data to post or 1 of many how to deal it
Ans: when you post 1 data you send an => object {}
and when you post many data you send an => array []
# All in Json format **

# finally add a logic 
if (Array.isArray(newProduct)){
      result = await productColl.insertMany(newProducts);
    } else {
      result = await productColl.insertOne(newProducts);
}

# Query paramiter?

# Primary Key and foregien key?

# find specific data 
=> let's need specific email data
=> http://localhost:3000/products?email=seller7@example.com