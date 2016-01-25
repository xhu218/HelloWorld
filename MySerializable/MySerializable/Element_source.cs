using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace MySerializable
{
    [Serializable]
    public class Element_source
    {

        private object[] itemsField;


        /// <summary>
        /// this field can be one of following type: item, story, itemID, storyID
        /// Additional ,in order to serialize this object correctly, please set ItemsElementName property.
        /// </summary>
        [XmlChoiceIdentifier("EnumTypes")]
        [XmlElement("item", typeof(Item))]
        [XmlElement("itemID", typeof(string))]
        [XmlElement("story", typeof(Story))]
        [XmlElement("storyID", typeof(string))]
        public object[] Items
        {
            get
            {
                return this.itemsField;
            }
            set
            {
                this.itemsField = value;
            }
        }


        /// <summary>
        /// specify the type of Element_source item array 's data type,
        /// </summary>
        [XmlIgnore()]
        public ItemChoiceType ItemsType
        {
            set
            {
                if (Items != null)
                {
                    EnumTypes = new ItemChoiceType[Items.Length];
                    for (int i = 0; i < Items.Length; i++)
                    {
                        EnumTypes[i] = value;
                    }
                }
            }

            get
            {
                return EnumTypes[0];
            }
        }



        //private ItemChoiceType itemsType;

        /// <summary>
        /// This field is only an identifier for xml serialization,do NOT set value directly.
        /// </summary>
        [XmlIgnore]
        public ItemChoiceType[] EnumTypes;

    }

    [XmlType(IncludeInSchema = false)]
    public enum ItemChoiceType
    {
        item, itemID, story, storyID
    } 

}
