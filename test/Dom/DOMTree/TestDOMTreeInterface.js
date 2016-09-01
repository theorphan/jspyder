import {TestObject} from "TestObject";
import {Assert} from "Assert";

export class TestDOMTreeInterface extends TestObject {
    constructor(jspyder) {
        this.jspyder = jspyder;
        super("Dom/DOMTree/DOMTreeInterface");
        this.autoloadTests();
        this.startTests();
    }
    
    testCreateDocumentFragment() {
        var dom = this.jspyder.dom("<div></div><div></div><div></div>");
        var docFragment = dom.createDocumentFragment();
        
        Assert(docFragment);
        Assert.Equal(11, docFragment.nodeType);
    }
    
    testAttach() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        this.jspyder.dom(child).attach(parent);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAttachStart() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(child).attachStart(parent);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAttachBefore() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child2).attachBefore(child1);
        
        Assert.Equal(child2, parent.children[0]);
    }
    
    testAttachAfter() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child2).attachAfter(child1);
        
        Assert.Equal(child2, parent.children[1]);
    }
    
    testAppend() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(parent).append(child);

        Assert.Equal(child, parent.lastChild);
    }
    
    testPrepend() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        parent.appendChild(document.createElement("div"));
        
        this.jspyder.dom(parent).prepend(child);
        
        Assert.Equal(child, parent.children[0]);
    }
    
    testAppendBefore() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");
        
        parent.appendChild(child2);
        
        this.jspyder.dom(child2).appendBefore(child1);
        
        Assert.Equal(child1, parent.children[0]);
    }
    
    testAppendAfter() {
        var parent = document.createElement("div");
        var child1 = document.createElement("div");
        var child2 = document.createElement("div");

        child1.toString = () => "child1"; 
        child2.toString = () => "child2"; 
        
        parent.appendChild(child1);
        
        this.jspyder.dom(child1).appendAfter(child2);
        Assert.Equal(child2, parent.children[1]);
    }
    
    testRemove() {
        var parent = document.createElement("div");
        var child = document.createElement("div");
        
        parent.appendChild(child);
        
        this.jspyder.dom(child).remove();
        
        Assert.IsNull(child.parentNode);
    }
    
    testOnParents() {
        var parent = document.createElement("div");
        var child = document.createElement("div");

        child.toString = () => "child";
        parent.toString = () => "parent";

        parent.appendChild(child);
        var foundParent = null;

        this.jspyder.dom(child).onParents(
            (p, c) => (foundParent = p) && Assert.Equal(parent, p)
        );

        Assert.Equal(parent, foundParent);
    }

    testParents() {
        var parent = document.createElement("div");
        var child = document.createElement("div");

        child.toString = () => "child";
        parent.toString = () => "parent";

        parent.appendChild(child);
        var foundParent = this.jspyder.dom(child).parents().exportElement(0);

        Assert.Equal(parent, foundParent);
    }
    
    testOnChildren() {
        var parent = document.createElement("div");
        var child = document.createElement("div");

        child.toString = () => "child";
        parent.toString = () => "parent";

        parent.appendChild(child);
        var foundChild = null;

        this.jspyder.dom(parent).onChildren(function() {
            foundChild = this.exportElement(0);
        });

        Assert.Equal(child, foundChild);
    }

    testChildren() {
        var parent = document.createElement("div");
        var child = document.createElement("div");

        child.toString = () => "child";
        parent.toString = () => "parent";

        parent.appendChild(child);
        var foundChild = this.jspyder.dom(child).children().exportElement(0);

        Assert.Equal(child, foundChild);
    }


    testFind() {
        const className = "test-class";

        var div = document.createElement("div");
        var find = document.createElement("div");
        find.className = className;

        div.appendChild(find);

        find.toString = () => "[find div]";

        var found = this.jspyder.dom(div).find(`.${className}`).exportElement(0);

        Assert.Equal(find, found);
    }

    testFilter() {
        const filterClass = "filter-class";
        const excludeClass = "exclude-class";

        var filter = document.createElement("div");
        var exclude = document.createElement("div");

        filter.className = filterClass;
        exclude.className = excludeClass;

        filter.toString = () => "[filter div]";
        exclude.toString = () => "[exclude div]";

        var filtered = this.jspyder.dom([filter, exclude]).filter(`.${filterClass}`).remove();

        Assert.InArray(filtered._element, filter);
        Assert.NotInArray(filtered._element, exclude);
    }

    testExclude() {
        const filterClass = "filter-class";
        const excludeClass = "exclude-class";

        var filter = document.createElement("div");
        var exclude = document.createElement("div");

        filter.className = filterClass;
        exclude.className = excludeClass;

        filter.toString = () => "[filter div]";
        exclude.toString = () => "[exclude div]";

        var excluded = this.jspyder.dom([filter, exclude]).exclude(`.${excludeClass}`).remove();

        Assert.InArray(excluded._element, filter);
        Assert.NotInArray(excluded._element, exclude);
    }

    testAnd() {
        var div = document.createElement("div");
        var and = document.createElement("div");

        div.toString = () => "[div]";
        and.toString = () => "[and]";

        var jsDom = this.jspyder.dom(div).and(and);

        Assert.InArray(jsDom._element, div);
        Assert.InArray(jsDom._element, and);
    }
}