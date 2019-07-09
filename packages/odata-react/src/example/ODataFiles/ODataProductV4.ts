export default `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0"
    xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
    <edmx:DataServices>
        <Schema Namespace="ODataDemo"
            xmlns="http://docs.oasis-open.org/odata/ns/edm">
            <EntityType Name="Product">
                <Key>
                    <PropertyRef Name="ID" />
                </Key>
                <Property Name="ID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Name" Type="Edm.String" />
                <Property Name="Description" Type="Edm.String" />
                <Property Name="ReleaseDate" Type="Edm.DateTimeOffset" Nullable="false" />
                <Property Name="DiscontinuedDate" Type="Edm.DateTimeOffset" />
                <Property Name="Rating" Type="Edm.Int16" Nullable="false" />
                <Property Name="Price" Type="Edm.Double" Nullable="false" />
                <NavigationProperty Name="Categories" Type="Collection(ODataDemo.Category)" Partner="Products" />
                <NavigationProperty Name="Supplier" Type="ODataDemo.Supplier" Partner="Products" />
                <NavigationProperty Name="ProductDetail" Type="ODataDemo.ProductDetail" Partner="Product" />
            </EntityType>
            <EntityType Name="FeaturedProduct" BaseType="ODataDemo.Product">
                <NavigationProperty Name="Advertisement" Type="ODataDemo.Advertisement" Partner="FeaturedProduct" />
            </EntityType>
            <EntityType Name="ProductDetail">
                <Key>
                    <PropertyRef Name="ProductID" />
                </Key>
                <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Details" Type="Edm.String" />
                <NavigationProperty Name="Product" Type="ODataDemo.Product" Partner="ProductDetail" />
            </EntityType>
            <EntityType Name="Category" OpenType="true">
                <Key>
                    <PropertyRef Name="ID" />
                </Key>
                <Property Name="ID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Name" Type="Edm.String" />
                <NavigationProperty Name="Products" Type="Collection(ODataDemo.Product)" Partner="Categories" />
            </EntityType>
            <EntityType Name="Supplier">
                <Key>
                    <PropertyRef Name="ID" />
                </Key>
                <Property Name="ID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Name" Type="Edm.String" />
                <Property Name="Address" Type="ODataDemo.Address" />
                <Property Name="Location" Type="Edm.GeographyPoint" SRID="Variable" />
                <Property Name="Concurrency" Type="Edm.Int32" ConcurrencyMode="Fixed" Nullable="false" />
                <NavigationProperty Name="Products" Type="Collection(ODataDemo.Product)" Partner="Supplier" />
            </EntityType>
            <ComplexType Name="Address">
                <Property Name="Street" Type="Edm.String" />
                <Property Name="City" Type="Edm.String" />
                <Property Name="State" Type="Edm.String" />
                <Property Name="ZipCode" Type="Edm.String" />
                <Property Name="Country" Type="Edm.String" />
            </ComplexType>
            <EntityType Name="Person">
                <Key>
                    <PropertyRef Name="ID" />
                </Key>
                <Property Name="ID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Name" Type="Edm.String" />
                <NavigationProperty Name="PersonDetail" Type="ODataDemo.PersonDetail" Partner="Person" />
            </EntityType>
            <EntityType Name="Customer" BaseType="ODataDemo.Person">
                <Property Name="TotalExpense" Type="Edm.Decimal" Nullable="false" />
            </EntityType>
            <EntityType Name="Employee" BaseType="ODataDemo.Person">
                <Property Name="EmployeeID" Type="Edm.Int64" Nullable="false" />
                <Property Name="HireDate" Type="Edm.DateTimeOffset" Nullable="false" />
                <Property Name="Salary" Type="Edm.Single" Nullable="false" />
            </EntityType>
            <EntityType Name="PersonDetail">
                <Key>
                    <PropertyRef Name="PersonID" />
                </Key>
                <Property Name="PersonID" Type="Edm.Int32" Nullable="false" />
                <Property Name="Age" Type="Edm.Byte" Nullable="false" />
                <Property Name="Gender" Type="Edm.Boolean" Nullable="false" />
                <Property Name="Phone" Type="Edm.String" />
                <Property Name="Address" Type="ODataDemo.Address" />
                <Property Name="Photo" Type="Edm.Stream" Nullable="false" />
                <NavigationProperty Name="Person" Type="ODataDemo.Person" Partner="PersonDetail" />
            </EntityType>
            <EntityType Name="Advertisement" HasStream="true">
                <Key>
                    <PropertyRef Name="ID" />
                </Key>
                <Property Name="ID" Type="Edm.Guid" Nullable="false" />
                <Property Name="Name" Type="Edm.String" />
                <Property Name="AirDate" Type="Edm.DateTimeOffset" Nullable="false" />
                <NavigationProperty Name="FeaturedProduct" Type="ODataDemo.FeaturedProduct" Partner="Advertisement" />
            </EntityType>
            <EntityContainer Name="DemoService">
                <EntitySet Name="Products" EntityType="ODataDemo.Product">
                    <NavigationPropertyBinding Path="ODataDemo.FeaturedProduct/Advertisement" Target="Advertisements" />
                    <NavigationPropertyBinding Path="Categories" Target="Categories" />
                    <NavigationPropertyBinding Path="Supplier" Target="Suppliers" />
                    <NavigationPropertyBinding Path="ProductDetail" Target="ProductDetails" />
                </EntitySet>
                <EntitySet Name="ProductDetails" EntityType="ODataDemo.ProductDetail">
                    <NavigationPropertyBinding Path="Product" Target="Products" />
                </EntitySet>
                <EntitySet Name="Categories" EntityType="ODataDemo.Category">
                    <NavigationPropertyBinding Path="Products" Target="Products" />
                </EntitySet>
                <EntitySet Name="Suppliers" EntityType="ODataDemo.Supplier">
                    <NavigationPropertyBinding Path="Products" Target="Products" />
                </EntitySet>
                <EntitySet Name="Persons" EntityType="ODataDemo.Person">
                    <NavigationPropertyBinding Path="PersonDetail" Target="PersonDetails" />
                </EntitySet>
                <EntitySet Name="PersonDetails" EntityType="ODataDemo.PersonDetail">
                    <NavigationPropertyBinding Path="Person" Target="Persons" />
                </EntitySet>
                <EntitySet Name="Advertisements" EntityType="ODataDemo.Advertisement">
                    <NavigationPropertyBinding Path="FeaturedProduct" Target="Products" />
                </EntitySet>
            </EntityContainer>
            <Annotations Target="ODataDemo.DemoService">
                <Annotation Term="Org.OData.Display.V1.Description" String="This is a sample OData service with vocabularies" />
            </Annotations>
            <Annotations Target="ODataDemo.Product">
                <Annotation Term="Org.OData.Display.V1.Description" String="All Products available in the online store" />
            </Annotations>
            <Annotations Target="ODataDemo.Product/Name">
                <Annotation Term="Org.OData.Display.V1.DisplayName" String="Product Name" />
            </Annotations>
            <Annotations Target="ODataDemo.DemoService/Suppliers">
                <Annotation Term="Org.OData.Publication.V1.PublisherName" String="Microsoft Corp." />
                <Annotation Term="Org.OData.Publication.V1.PublisherId" String="MSFT" />
                <Annotation Term="Org.OData.Publication.V1.Keywords" String="Inventory, Supplier, Advertisers, Sales, Finance" />
                <Annotation Term="Org.OData.Publication.V1.AttributionUrl" String="http://www.odata.org/" />
                <Annotation Term="Org.OData.Publication.V1.AttributionDescription" String="All rights reserved" />
                <Annotation Term="Org.OData.Publication.V1.DocumentationUrl " String="http://www.odata.org/" />
                <Annotation Term="Org.OData.Publication.V1.TermsOfUseUrl" String="All rights reserved" />
                <Annotation Term="Org.OData.Publication.V1.PrivacyPolicyUrl" String="http://www.odata.org/" />
                <Annotation Term="Org.OData.Publication.V1.LastModified" String="4/2/2013" />
                <Annotation Term="Org.OData.Publication.V1.ImageUrl " String="http://www.odata.org/" />
            </Annotations>
        </Schema>
    </edmx:DataServices>
</edmx:Edmx>`;
