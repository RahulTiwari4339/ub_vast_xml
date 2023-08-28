import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Form";

const Xml = () => {
  const [clientName, setClientName] = useState();
  const [descUrl, setDescUrl] = useState();
  const [adTags, setAdTags] = useState();

  const checkbox = useRef();
  const [final, setFinal] = useState([]);

  let spiltadtags = adTags;

  var encodedUrl = encodeURIComponent(descUrl);

  const updateData = () => {
    let updatetags = spiltadtags.split("\n");
    let kvdata = null;
    for (let i = 0; i < updatetags.length; i++) {
      if (updatetags[i].length < 4) {
        kvdata = updatetags[i];
      }
      if (kvdata != null && updatetags[i].length > 4) {
        updatetags[i] = updatetags[i] + "&cust_params=KV1%3D" + kvdata;
        updatetags[i] = updatetags[i].replace("[placeholder]", encodedUrl);
      } else if (kvdata == null) {
        updatetags[i] = updatetags[i].replace("[placeholder]", encodedUrl);
      }
    }

    let newtags = updatetags.filter((filitem) => {
      return filitem.length > 4;
    });

    const tagwithoutKV = newtags.filter((nnn) => {
      return !nnn.includes("KV1%3D");
    });
    console.log(tagwithoutKV);

    const filterkvTags = newtags.filter((number) => {
      return number.includes("KV1%3D");
    });

    let kvSorting = filterkvTags.sort((a, b) => {
      a = a.split("3D")[1];
      b = b.split("3D")[1];
      return b - a;
    });

    let concattage = kvSorting.concat(tagwithoutKV);

    let vast = [];
    for (let i = 0; i < concattage.length; i++) {
      let create_uuid = uuid();
      let data = `<Ad  id="${create_uuid}">
        <Wrapper fallbackOnNoAd="true" followAdditonalWrappers="true">
            <AdSystem>UNIBOTS</AdSystem>
            <VASTAdTagURI>
                <![CDATA[ ${concattage[i]}]]>
            </VASTAdTagURI>
            <Error id="Unibots">
                <![CDATA[ about:blank ]]>
            </Error>
            <Impression>
                <![CDATA[ about:blank ]]>
            </Impression>
            <Extensions>
            <Extension type="waterfall" fallback_index="0"/>
        </Extensions>
        </Wrapper>
        </Ad>
        `;
      vast.push(data);
    }

    let jointag = vast.join("");
    final.push(jointag);

    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<VAST xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="4.0" xsi:noNamespaceSchemaLocation="vast.xsd">
        ${final}
</VAST>
 `;

    const blob = new Blob([xmlString], { type: "application/xml" });

    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = clientName + ".xml";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };

  const SubmitData = (e) => {
    e.preventDefault();
    updateData();
  };

  return (
    <>
      <Form
        SubmitData={SubmitData}
        setClientName={setClientName}
        setAdTags={setAdTags}
        setDescUrl={setDescUrl}
      />
    </>
  );
};

export default Xml;
