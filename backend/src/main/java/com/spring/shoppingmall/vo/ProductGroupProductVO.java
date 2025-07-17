package com.spring.shoppingmall.vo;

public class ProductGroupProductVO {
    private int prdGrPrdIdx;
    private int prdGrIdx;
    private String prdIdx;
    private String prdGrPrdView;

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

    public String getPrdIdx() {
        return prdIdx;
    }

    public void setPrdIdx(String prdIdx) {
        this.prdIdx = prdIdx;
    }

    public String getPrdGrPrdView() {
        return prdGrPrdView;
    }

    public void setPrdGrPrdView(String prdGrPrdView) {
        this.prdGrPrdView = prdGrPrdView;
    }

    @Override
    public String toString() {
        return "ProductGroupProductVO{" +
                "prdGrPrdIdx=" + prdGrPrdIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdIdx='" + prdIdx + '\'' +
                ", prdGrPrdView='" + prdGrPrdView + '\'' +
                '}';
    }
}
