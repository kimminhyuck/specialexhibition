package com.spring.shoppingmall.vo;

import org.springframework.web.multipart.MultipartFile;

public class ProductDTO {
    private int prdGrPrdIdx;
    private int prdGrIdx;
    private int prdIdx;
    private String prdGrPrdView;
    private String crudType;

    public int getPrdGrPrdIdx() {
        return prdGrPrdIdx;
    }

    public void setPrdGrPrdIdx(int prdGrPrdIdx) {
        this.prdGrPrdIdx = prdGrPrdIdx;
    }

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public int getPrdIdx() {
        return prdIdx;
    }

    public void setPrdIdx(int prdIdx) {
        this.prdIdx = prdIdx;
    }

    public String getPrdGrPrdView() {
        return prdGrPrdView;
    }

    public void setPrdGrPrdView(String prdGrPrdView) {
        this.prdGrPrdView = prdGrPrdView;
    }

    public String getCrudType() {
        return crudType;
    }

    public void setCrudType(String crudType) {
        this.crudType = crudType;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "prdGrPrdIdx=" + prdGrPrdIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdIdx=" + prdIdx +
                ", prdGrPrdView='" + prdGrPrdView + '\'' +
                ", crudType='" + crudType + '\'' +
                '}';
    }
}
