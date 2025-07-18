package com.spring.shoppingmall.vo;

import org.springframework.web.multipart.MultipartFile;

public class ProductDTO {
    private String prdBr;
    private String prdCtgr;
    private String prdName;
    private String prdPrc;
    private String prdView;
    private String prdImg;
    private String crudType;
    private MultipartFile imgFile;

    public String getPrdBr() {
        return prdBr;
    }

    public void setPrdBr(String prdBr) {
        this.prdBr = prdBr;
    }

    public String getPrdCtgr() {
        return prdCtgr;
    }

    public void setPrdCtgr(String prdCtgr) {
        this.prdCtgr = prdCtgr;
    }

    public String getPrdName() {
        return prdName;
    }

    public void setPrdName(String prdName) {
        this.prdName = prdName;
    }

    public String getPrdPrc() {
        return prdPrc;
    }

    public void setPrdPrc(String prdPrc) {
        this.prdPrc = prdPrc;
    }

    public String getPrdView() {
        return prdView;
    }

    public void setPrdView(String prdView) {
        this.prdView = prdView;
    }

    public String getPrdImg() {
        return prdImg;
    }

    public void setPrdImg(String prdImg) {
        this.prdImg = prdImg;
    }

    public String getCrudType() {
        return crudType;
    }

    public void setCrudType(String crudType) {
        this.crudType = crudType;
    }

    public MultipartFile getImgFile() {
        return imgFile;
    }

    public void setImgFile(MultipartFile imgFile) {
        this.imgFile = imgFile;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "prdBr='" + prdBr + '\'' +
                ", prdCtgr='" + prdCtgr + '\'' +
                ", prdName='" + prdName + '\'' +
                ", prdPrc='" + prdPrc + '\'' +
                ", prdView='" + prdView + '\'' +
                ", prdImg='" + prdImg + '\'' +
                ", crudType='" + crudType + '\'' +
                ", imgFile=" + imgFile +
                '}';
    }
}
